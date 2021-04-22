import { Router } from 'express';
import * as authCtrl from './../controllers/auth.controller';
import { verifySignUp } from "./../middlewares";
const router = Router();

router.post("/login", authCtrl.login);
router.post("/register", [
    verifySignUp.checkDuplicatedUsernameEmail,
    verifySignUp.checkRolesExists
], authCtrl.register);


export default router;