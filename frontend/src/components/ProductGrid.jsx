import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading, error }) {
    // État erreur
    if (error) return <p className="error">Erreur : {error}</p>

    // État chargement
    if (loading) return <p className="loading">Chargement...</p>

    // État vide
    if (products.length === 0) return <p className="empty">Aucun produit trouve.</p>

    // État normal
    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    )
}