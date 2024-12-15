export default class Error {
    constructor(code, title, message) {
        this.code = code;
        this.title = title;
        this.message = message;
    }
}

export const unauthorized = new Error(401, "Unauthorized Access", "Sorry, you don't have permission to access this page.");
export const notFound = new Error(404, "Page Not Found", "The page you are looking for does not exist.");
export const internalServerError = new Error(500, "Internal Server Error", "An error occurred on the server. Please try again later.");
export const timeout = new Error(504, "Timeout", "The request timed out. Please try again later.");
export const serverUnavailable = new Error(503, "Server Unavailable", "The server is currently unavailable. Please try again later.");
