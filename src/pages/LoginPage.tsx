import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { OtpStep } from '@/components/OtpStep/OtpStep'
import { loginPhoneSchema, type LoginPhoneFormValues } from '@/application/validators/authValidators'
import { useLoginMobile } from '@/hooks/useLoginMobile'
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '@/core/constants/countryCodes'
import { getHomeRouteForUser } from '@/utils/roleRedirect'
import type { IRequiresOtpResponse } from '@/core/interfaces/IAuth'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { OtpChannelSelect } from '@/components/OtpChannelSelect/OtpChannelSelect'

export default function LoginPage() {
  const navigate = useNavigate()
  const [otpContext, setOtpContext] = useState<IRequiresOtpResponse | null>(null)
  const loginMobile = useLoginMobile()

const form = useForm<LoginPhoneFormValues>({
  resolver: zodResolver(loginPhoneSchema),
  defaultValues: { countryCode: DEFAULT_COUNTRY_CODE.code, preferredChannel: 'email' },
})

  const onSubmit = form.handleSubmit(async (values) => {
    const response = await loginMobile.mutateAsync({
      phone: `${values.countryCode}${values.localPhone}`,
      preferredChannel: values.preferredChannel,
    })
    setOtpContext(response)
  })

  if (otpContext) {
    return (
      <div className="w-full space-y-8">
        <div className="text-center">
          <MaterialIcon className="mb-2 text-4xl text-primary" name="eco" />
          <h1 className="font-headline text-2xl font-bold text-on-surface">Connexion</h1>
        </div>
        <OtpStep
          channel={otpContext.otp_sent_via}
          contact={otpContext.contact}
          onBack={() => setOtpContext(null)}
          onVerified={(user) => navigate(getHomeRouteForUser(user))}
          userId={otpContext.user_id}
        />
      </div>
    )
  }

  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <MaterialIcon className="mb-2 text-4xl text-primary" name="eco" />
        <h1 className="font-headline text-2xl font-bold text-on-surface">Connexion</h1>
        <p className="text-sm text-on-surface-variant">Entrez votre numéro pour recevoir un code</p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="ml-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
            Numéro de téléphone
          </label>
          <div className="mt-2 flex gap-3">
            <select
              className="rounded-lg bg-surface-container-high px-4 py-4 font-bold text-on-surface"
              {...form.register('countryCode')}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <input
              className="flex-1 rounded-lg bg-surface-container-high px-6 py-4 font-semibold text-on-surface focus:ring-2 focus:ring-primary/40"
              placeholder="77 000 00 00"
              type="tel"
              {...form.register('localPhone')}
            />
          </div>
          {form.formState.errors.localPhone && (
            <p className="ml-4 mt-1 text-xs text-error">{form.formState.errors.localPhone.message}</p>
          )}
        </div>

        <OtpChannelSelect
  onChange={(channel) => form.setValue('preferredChannel', channel)}
  value={form.watch('preferredChannel')}
/>

        {loginMobile.isError && (
          <p className="rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
            Numéro introuvable. Vérifiez ou créez un compte.
          </p>
        )}

        <button
          className="action-gradient w-full rounded-full py-4 font-headline text-lg font-bold text-white disabled:opacity-60"
          disabled={loginMobile.isPending}
          type="submit"
        >
          {loginMobile.isPending ? 'Envoi...' : 'Recevoir le code'}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-500">
        Pas encore de compte ?
        <button className="ml-1 font-bold text-primary" onClick={() => navigate('/register')} type="button">
          Créer un compte
        </button>
      </p>
    </div>
  )
}