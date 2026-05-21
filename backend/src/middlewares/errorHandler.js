function errorHandler(err, req, res, next)
{
    console.error('Erreur :', err.message)

    const statusCode = err.statusCode || 500
    const message = statusCode === 500 ? 'Internal Server Error' : err.message

    res.status(statusCode).json({
        success: false,
        error: message,
        // En developpement affichage de la stack pour deboguer
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
}

module.exports = errorHandler