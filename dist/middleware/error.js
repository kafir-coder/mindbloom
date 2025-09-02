"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err); // Log for debugging
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    console.log(err);
    res.status(status).json({
        error: Object.assign({ message }, (process.env.NODE_ENV === 'development' && { stack: err.stack })),
    });
};
exports.errorHandler = errorHandler;
