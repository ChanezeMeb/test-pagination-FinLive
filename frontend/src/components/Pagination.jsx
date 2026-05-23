export default function Pagination({ pagination, onPageChange }) {
    // Si pas de pagination ou une seule page → rien afficher
    if (!pagination || pagination.totalPages <= 1) return null

    const { page, totalPages, hasNextPage, hasPrevPage } = pagination

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={!hasPrevPage}
            >
                Précédent
            </button>

            <span className="page-info">
                Page {page} / {totalPages}
            </span>

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNextPage}
            >
                Suivant
            </button>
        </div>
    )
}