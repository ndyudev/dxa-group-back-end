const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err);

    let error = { ...err };
    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = { statusCode: 404, message };
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = { statusCode: 400, message };
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = { statusCode: 400, message };
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler; 