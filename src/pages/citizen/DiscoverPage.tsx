import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useEducationalPosts } from '@/hooks/useEducationalPosts'
import { useProducts } from '@/hooks/useProducts'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { Loader } from '@/components/Loader/Loader'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Card } from '@/components/Card/Card'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { truncate } from '@/utils/text'
import { formatCurrency } from '@/utils/currency'

type Tab = 'posts' | 'products'

export default function DiscoverPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('posts')

  const postsQuery = useEducationalPosts()
  const productsQuery = useProducts()

  return (
    <div className="text-on-surface">
      <TopBar
        leftIcon="arrow_back"
        leftLabel="Retour"
        onLeftClick={() => navigate('/app')}
        title="Découvrir"
      />

      <main className="mx-auto max-w-screen-xl space-y-6 px-6 pb-12 pt-24">
        <div className="flex gap-2 rounded-full bg-surface-container-high p-1">
          <button
            className={[
              'flex-1 rounded-full py-3 text-sm font-bold transition-colors',
              activeTab === 'posts' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant',
            ].join(' ')}
            onClick={() => setActiveTab('posts')}
            type="button"
          >
            Contenus éducatifs
          </button>
          <button
            className={[
              'flex-1 rounded-full py-3 text-sm font-bold transition-colors',
              activeTab === 'products' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant',
            ].join(' ')}
            onClick={() => setActiveTab('products')}
            type="button"
          >
            Produits partenaires
          </button>
        </div>

        {activeTab === 'posts' && (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {postsQuery.isLoading && <Loader label="Chargement des contenus..." />}

            {postsQuery.isError && (
              <EmptyState
                description="Vérifiez votre connexion et réessayez."
                icon="error_outline"
                title="Impossible de charger les contenus"
              />
            )}

            {postsQuery.data?.data.length === 0 && (
              <EmptyState
                description="Les partenaires n'ont pas encore publié de contenu."
                icon="menu_book"
                title="Aucun contenu pour le moment"
              />
            )}

            {postsQuery.data?.data.map((post) => (
              <Card
                key={post.id}
                description={truncate(post.content, 120)}
                imageFallbackIcon={<MaterialIcon className="text-4xl text-on-surface-variant/40" name="menu_book" />}
                imageUrl={post.image_path}
                subtitle={post.partner.partner_profile?.company_name ?? post.partner.name}
                title={post.title}
              />
            ))}
          </section>
        )}

        {activeTab === 'products' && (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {productsQuery.isLoading && <Loader label="Chargement des produits..." />}

            {productsQuery.isError && (
              <EmptyState
                description="Vérifiez votre connexion et réessayez."
                icon="error_outline"
                title="Impossible de charger les produits"
              />
            )}

            {productsQuery.data?.data.length === 0 && (
              <EmptyState
                description="Les partenaires n'ont pas encore publié de produit."
                icon="storefront"
                title="Aucun produit pour le moment"
              />
            )}

            {productsQuery.data?.data.map((product) => (
              <Card
                key={product.id}
                description={product.description ? truncate(product.description, 100) : undefined}
                footer={
                  <span className="font-headline text-lg font-extrabold text-primary">
                    {formatCurrency(product.price)}
                  </span>
                }
                imageFallbackIcon={<MaterialIcon className="text-4xl text-on-surface-variant/40" name="inventory_2" />}
                imageUrl={product.image_path}
                subtitle={product.partner.partner_profile?.company_name ?? product.partner.name}
                title={product.name}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  )
}