import { body } from "express-validator";

export const serverValidation = [
    body().custom((_, { req }) => {
        if (!req.body)
            throw new Error("Missing body");
        return true;
    }),
    body("name").notEmpty().withMessage("Name is required"),
    body("path").notEmpty().withMessage("Path is required"),
    body("url")
        .notEmpty().withMessage("Url is required")
        .isURL().withMessage("Url is invalid"),
    body("secure")
        .notEmpty().withMessage("Secure is required")
        .isBoolean().withMessage("Secure must be a boolean")
];
