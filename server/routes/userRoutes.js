import express from "express";
import { login, register, logout, getUser, getAllusers, deleteUserById, getAllRecuriters} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.get('/getAllusers',getAllusers);
router.delete('/delete-user/:id',deleteUserById);
router.get('/getAllRecuriters',getAllRecuriters)

export default router;
