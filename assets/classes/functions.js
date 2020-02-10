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
exports.isErr = (err) => {
    return err instanceof Error;
}

exports.checkAndchange = (obj) => {
    if(this.isErr(obj)) {
        return this.error(obj.message)
    }else {
        return this.success(obj)
    }
}
