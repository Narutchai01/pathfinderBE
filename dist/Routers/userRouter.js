"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoginUserController_1 = require("../Controller/User/LoginUserController");
const router = express_1.default.Router();
router.get("/login", LoginUserController_1.loginUserController);
exports.default = router;
