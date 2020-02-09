exports.success = (result) => {
    return {
        status: 'success',
        result: result
    }
}

exports.error = (message) => {
    return {
        status: 'error',
        message: message
    }
}
