import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { OtpStep } from '@/components/OtpStep/OtpStep'
import { registerSchema, type RegisterFormValues } from '@/application/validators/authValidators'
import { useRegister } from '@/hooks/useRegister'
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '@/core/constants/countryCodes'
import { ROLE_IDS } from '@/core/constants/role'
import { getHomeRouteForUser } from '@/utils/roleRedirect'
import type { IRequiresOtpResponse } from '@/core/interfaces/IAuth'
import { OtpChannelSelect } from '@/components/OtpChannelSelect/OtpChannelSelect'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [otpContext, setOtpContext] = useState<IRequiresOtpResponse | null>(null)
  const register = useRegister()

const form = useForm<RegisterFormValues>({
  resolver: zodResolver(registerSchema),
  defaultValues: { countryCode: DEFAULT_COUNTRY_CODE.code, preferred_otp_channel: 'email' },
})

  const onSubmit = form.handleSubmit(async (values) => {
    const response = await register.mutateAsync({
      name: values.name,
      email: values.email || undefined,
      phone: `${values.countryCode}${values.localPhone}`,
      role_id: ROLE_IDS.CITIZEN,
      preferred_otp_channel: values.preferred_otp_channel,
    })
    setOtpContext(response)
  })

  if (otpContext) {
    return (
      <div className="w-full space-y-8">
        <div className="text-center">
          <MaterialIcon className="mb-2 text-4xl text-primary" name="eco" />
          <h1 className="font-headline text-2xl font-bold text-on-surface">Vérification</h1>
        </div>
        <OtpStep
          channel={otpContext.otp_sent_via}
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
        <h1 className="font-headline text-2xl font-bold text-on-surface">Créer un compte</h1>
        <p className="text-sm text-on-surface-variant">Rejoignez EcoCash Sénégal</p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="ml-4 text-xs font-bold uppercase tracking-widest text-zinc-400">Nom complet</label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-6 py-4 font-semibold text-on-surface focus:ring-2 focus:ring-primary/40"
            placeholder="Entrez votre nom complet"
            type="text"
            {...form.register('name')}
          />
          {form.formState.errors.name && (
            <p className="ml-4 mt-1 text-xs text-error">{form.formState.errors.name.message}</p>
          )}
        </div>

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

        <div>
          <label className="ml-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
            Email (optionnel)
          </label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-6 py-4 font-semibold text-on-surface focus:ring-2 focus:ring-primary/40"
            placeholder="vous@exemple.com"
            type="email"
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <p className="ml-4 mt-1 text-xs text-error">{form.formState.errors.email.message}</p>
          )}
        </div>

        <OtpChannelSelect
  onChange={(channel) => form.setValue('preferred_otp_channel', channel)}
  value={form.watch('preferred_otp_channel')}
/>

        {register.isError && (
          <p className="rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
            Cet email ou ce numéro est déjà utilisé.
          </p>
        )}

        <button
          className="action-gradient w-full rounded-full py-4 font-headline text-lg font-bold text-white disabled:opacity-60"
          disabled={register.isPending}
          type="submit"
        >
          {register.isPending ? 'Création...' : 'Continuer'}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-500">
        Vous avez déjà un compte ?
        <button className="ml-1 font-bold text-primary" onClick={() => navigate('/login')} type="button">
          Se connecter
        </button>
      </p>
    </div>
  )
}