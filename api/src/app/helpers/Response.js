class Response {

    constructor() {
        this.succesCodes = [200, 201];
        this.validationErrorCode = [422];
        this.errorCodes = [400, 401, 404, 403, 500];

    }

    /**
    * @desc    Make and send any response
    *
    * @param   {any} res
    * @param   {object | array} results
    * @param   {number} statusCode
    * @param   {string} message
    */
    makeResponse = (res, results = null, statusCode = 200, message = null) => {
        // Get matched code

        message = this.makeMessage(message, statusCode);

        if (this.succesCodes.find((code) => code == statusCode)) {

            return res.status(statusCode).json(this.success(message, results, statusCode));

        } else if (this.validationErrorCode.find((code) => code == statusCode)) {

            return res.status(statusCode).json(this.validation(message, results));

        } else {

            const findCode = this.errorCodes.find((code) => code == statusCode);
            
            if (!findCode) findCode = 500;

            return res.status(findCode).json(this.error(message, findCode));
        }

    }


    /**
    * @desc    Send any success response
    *
    * @param   {string} message
    * @param   {object | array} results
    * @param   {number} statusCode
    */
    success = (message, results, statusCode) => {
        return {
            message: message ?? "succesfully",
            error: false,
            code: statusCode,
            data: results
        };
    };



    /**
     * @desc    Send any error response
     *
     * @param   {string} message
     * @param   {number} statusCode
     */
    error = (message, statusCode) => {

        return {
            message: message ?? "error",
            code: statusCode,
            error: true
        };
    };



    /**
    * @desc    Send any validation response
    *
    * @param   {string} message
    * @param   {object | array} errors
    */
    validation = (message, errors) => {
        return {
            message: message ?? "Validation errors",
            error: true,
            code: 422,
            errors: errors
        };
    }



    /**
     * @desc    Make any message
     *
     * @param   {string} message
     * @param   {number} statusCode
     */
    makeMessage = (message, statusCode) => {
        if (!message) {
            if (this.succesCodes.find((code) => code == statusCode)) {
                message = "Success response";
            } else if (this.validationErrorCode.find((code) => code == statusCode)) {
                message = "Validation error has occurred";
            } else {
                let findCode = this.errorCodes.find((code) => code == statusCode);

                if (!findCode) findCode = 500;

                message = findCode == 404 ? "Not found error" : "Error " + findCode + " has occured";
            }
        }
        return message;
    }
}

export default new Response();