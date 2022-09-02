function errorHandler(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
}

export {
    errorHandler,
}