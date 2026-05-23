import { useProducts } from './hooks/useProducts'
import ProductGrid from './components/ProductGrid'
import Pagination from './components/Pagination'

export default function App() {
  const { products, pagination, loading, error, filters, updateFilter } = useProducts()

  return (
    <>
      <header className="app-header">
        <h1>FinLive Shop</h1>
        <span className="tagline">Catalogue mode & accessoires</span>
      </header>

      <div className="app">
        <div className="toolbar">
          <p className="toolbar-left">
            <span>{pagination?.total ?? '—'}</span> produits trouvés
          </p>
          <div className="filters">
            <select value={filters.category} onChange={e => updateFilter('category', e.target.value)}>
              <option value="">Toutes catégories</option>
              <option value="shoes">Chaussures</option>
              <option value="clothing">Vêtements</option>
              <option value="accessories">Accessoires</option>
              <option value="bags">Sacs</option>
            </select>

            <select value={filters.sortBy} onChange={e => updateFilter('sortBy', e.target.value)}>
              <option value="createdAt">Date</option>
              <option value="price">Prix</option>
              <option value="name">Nom</option>
            </select>

            <select value={filters.order} onChange={e => updateFilter('order', e.target.value)}>
              <option value="desc">Décroissant</option>
              <option value="asc">Croissant</option>
            </select>
          </div>
        </div>

        <ProductGrid products={products} loading={loading} error={error} />
        <Pagination pagination={pagination} onPageChange={p => updateFilter('page', p)} />
      </div>
    </>
  )
}