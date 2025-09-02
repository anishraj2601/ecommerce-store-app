"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const error_middleware_1 = require("./error.middleware");
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.parse(req.body);
            req.body = result;
            next();
        }
        catch (error) {
            const errorMessage = error.errors?.map((err) => err.message).join(", ") || "Validation failed";
            next((0, error_middleware_1.createError)(errorMessage, 400));
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validateRequest.js.map