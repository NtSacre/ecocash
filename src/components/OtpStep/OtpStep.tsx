import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpCodeSchema, type OtpCodeFormValues } from '@/application/validators/authValidators'
import { useVerifyOtp } from '@/hooks/useVerifyOtp'
import { useResendOtp } from '@/hooks/useResendOtp'
import type { OtpChannel } from '@/core/interfaces/IAuth'
import type { IUser } from '@/core/interfaces/IUser'

interface OtpStepProps {
  userId: number
  channel: OtpChannel
  contact?: string
  onVerified: (user: IUser) => void
  onBack: () => void
}

export function OtpStep({ userId, channel, contact, onVerified, onBack }: OtpStepProps) {
  const verifyOtp = useVerifyOtp()
  const resendOtp = useResendOtp()

  const form = useForm<OtpCodeFormValues>({ resolver: zodResolver(otpCodeSchema) })

  const onSubmit = form.handleSubmit(async (values) => {
    const user = await verifyOtp.mutateAsync({ user_id: userId, otp_code: values.otp_code })
    onVerified(user)
  })

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <p className="text-center text-sm text-on-surface-variant">
        Code envoyé par {channel}{contact ? ` à ${contact}` : ''}
      </p>

      <div>
        <label className="ml-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
          Code à 6 chiffres
        </label>
        <input
          className="mt-2 w-full rounded-lg bg-surface-container-high px-6 py-4 text-center font-headline text-2xl tracking-[0.5em] text-on-surface focus:ring-2 focus:ring-primary/40"
          inputMode="numeric"
          maxLength={6}
          type="text"
          {...form.register('otp_code')}
        />
        {form.formState.errors.otp_code && (
          <p className="ml-4 mt-1 text-xs text-error">{form.formState.errors.otp_code.message}</p>
        )}
      </div>

      {verifyOtp.isError && (
        <p className="rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
          Code invalide ou expiré.
        </p>
      )}

      <button
        className="action-gradient w-full rounded-full py-4 font-headline text-lg font-bold text-white disabled:opacity-60"
        disabled={verifyOtp.isPending}
        type="submit"
      >
        {verifyOtp.isPending ? 'Vérification...' : 'Valider'}
      </button>

      <div className="flex justify-between text-sm">
        <button className="font-semibold text-on-surface-variant" onClick={onBack} type="button">
          Changer de numéro
        </button>
        <button
          className="font-semibold text-primary disabled:opacity-60"
          disabled={resendOtp.isPending}
          onClick={() => resendOtp.mutate({ user_id: userId, otp_channel: channel })}
          type="button"
        >
          {resendOtp.isPending ? 'Envoi...' : 'Renvoyer le code'}
        </button>
      </div>
    </form>
  )
}