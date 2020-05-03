export class ErrorMessage {
    status: number;
    message: string;

    constructor() { }

    static authenticationError(): ErrorMessage {
        let errorMsg = new ErrorMessage();
        errorMsg.status = 401;
        errorMsg.message = "Full authentication is required to access this resource";
        return errorMsg;
    }

    static forbiddenError(): ErrorMessage {
        let errorMsg = new ErrorMessage();
        errorMsg.status = 403;
        errorMsg.message = "Forbidden";
        return errorMsg;
    }
}
