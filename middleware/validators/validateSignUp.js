const { body, validationResult } = require('express-validator');
const UserModel = require("../../models/User.js");

const validateSignUpRequest = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isAlpha().withMessage('Username must only contain letters')
        .isLength({ min: 6 }).withMessage('Username must be at least 6 characters long'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async value => {
            const user = await UserModel.findByEmail(value);
            if (user) {
                throw new Error('E-mail already in use');
            }
        }),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errorObj = {};
            (errors.array()).forEach(e => {
                errorObj[e.path] = e.msg;
            });
            return res.status(422).json({ errors: errorObj });
        }
        next();
    }
];

module.exports = {
    validateSignUpRequest
};