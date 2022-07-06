"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    about: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    avatar: {
        type: String,
        required: true,
        validate: {
            validator: (url) => validator_1.default.isURL(url),
            message: 'Must be a Valid URL',
        },
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (v) => (0, isEmail_1.default)(v),
            message: 'Неправильный формат почты',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
});
userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email }).select('+password')
        .then((user) => {
        if (!user) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return bcryptjs_1.default.compare(password, user.password)
            .then((matched) => {
            if (!matched) {
                return Promise.reject(new Error('Неправильные почта или пароль'));
            }
            return user;
        });
    });
};
exports.default = mongoose_1.default.model('user', userSchema);
