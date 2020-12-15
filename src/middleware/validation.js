
module.exports = (Schema) => {
    return (req, _res, next) => {
        // validation
        try {
            const { error, value } = Schema.validate(req.body);
            if (!error) return next();
            let err = new Error('Validation Error.');
            err.data = error.details?.map(errorObject => errorObject.message)
            err.statusCode = 422;
            next(err);
        } catch (error) {
            next(error);
        }
    }
}