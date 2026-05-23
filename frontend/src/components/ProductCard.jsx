export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <span className={`product-category category-${product.category}`}>
        {product.category}
      </span>
      <p className="product-name">{product.name}</p>
      <div className="product-footer">
        <span className="product-price">{product.price.toFixed(2)} €</span>
        <span className={`product-stock ${product.stock < 10 ? 'low' : ''}`}>
          {product.stock === 0 ? 'Rupture' : `Stock : ${product.stock}`}
        </span>
      </div>
    </div>
  )
}