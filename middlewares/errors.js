//404
export function notFound(_req, res, _next){
    res.status(404).json({error: 'recurso no encontrado'});
}

//errores
export function errorHandler(err, _req, res, _next){
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({error: err.message || 'Error Interno'})
}