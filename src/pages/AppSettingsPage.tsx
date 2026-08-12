import { useNavigate } from 'react-router-dom'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { ToggleSwitch } from '@/components/ToggleSwitch/ToggleSwitch'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { useAuthContext } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import { APP_VERSION, SUPPORT_CONTACT } from '@/core/constants/appInfo'

export default function AppSettingsPage() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { theme, toggleTheme } = useTheme()
  const updateProfile = useUpdateProfile()

  return (
    <>
    <div className="text-on-surface">
      <TopBar leftIcon="arrow_back" leftLabel="Retour" onLeftClick={() => navigate('/')} title="Paramètres" />

      <main className="mx-auto max-w-md space-y-8 px-6 pb-12 pt-24">
        <section className="space-y-3">
          <h2 className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Apparence</h2>
          <ToggleSwitch
            checked={theme === 'dark'}
            description="Réduit la luminosité de l'interface"
            label="Mode sombre"
            onChange={toggleTheme}
          />
        </section>

        <section className="space-y-3">
          <h2 className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Notifications</h2>
          <ToggleSwitch
            checked={user?.notifications_enabled ?? true}
            description="Alertes sur vos réponses, collectes et paiements"
            label="Recevoir les notifications"
            onChange={(checked) => updateProfile.mutate({ notifications_enabled: checked })}
          />
        </section>

        <section className="space-y-3">
          <h2 className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Langue</h2>
          <div className="flex gap-2 rounded-full bg-surface-container-high p-1">
            <button
              className="flex-1 rounded-full bg-surface-container-lowest py-3 text-sm font-bold text-primary shadow-sm"
              type="button"
            >
              Français
            </button>
            <button
              className="flex-1 cursor-not-allowed rounded-full py-3 text-sm font-bold text-on-surface-variant/50"
              disabled
              type="button"
            >
              English (bientôt)
            </button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Support</h2>
          
           <a className="flex items-center gap-3 rounded-lg bg-surface-container-lowest p-4 shadow-sm"
            href={`mailto:${SUPPORT_CONTACT.email}`}
          >
            <MaterialIcon className="text-primary" name="mail" />
            <span className="text-sm font-semibold text-on-surface">{SUPPORT_CONTACT.email}</span>
          </a>
          
         <a   className="flex items-center gap-3 rounded-lg bg-surface-container-lowest p-4 shadow-sm"
            href={`https://wa.me/${SUPPORT_CONTACT.whatsapp.replace('+', '')}`}
          >
            <MaterialIcon className="text-primary" name="chat" />
            <span className="text-sm font-semibold text-on-surface">WhatsApp : {SUPPORT_CONTACT.phone}</span>
          </a>
        </section>

        <section className="pt-4 text-center">
          <p className="text-xs text-on-surface-variant">EcoCash Sénégal · Version {APP_VERSION}</p>
        </section>
      </main>
    </div>
    </>
  )
  
}