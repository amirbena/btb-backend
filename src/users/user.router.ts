import { Router } from "express";
import { isValidLogin, isValidRegister } from "../middlewares/isValid";
import userService from "./user.service";

const router = Router();

router.post('/', isValidRegister, userService.userRegister);
router.post('/login', isValidLogin, userService.userLogin);


export default router;