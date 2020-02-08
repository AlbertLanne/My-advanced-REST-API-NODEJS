exports.success = function(result) {
    return {
        status: 'success',
        result: result
    }
}
exports.error = function(message) {
    return {
        status: 'error',
        result: message
    }
}
