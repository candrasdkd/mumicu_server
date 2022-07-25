import express from "express";
import { GetAllUsers, Register, Login, Logout } from "../controllers/Users.js";
import { ManualAbsensi, ScanAbsensi, TotalAttendance } from "../controllers/Absensi.js";
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { verifyAdmin } from "../middleware/VerifyAuthLevel.js";

const router = express.Router();

// AUTH
router.get('/users',  GetAllUsers);
router.post('/register', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

// ABSENSI
router.post('/manual-absensi',  ManualAbsensi);
router.post('/scan-absensi',  ScanAbsensi);
router.get('/attendance',  TotalAttendance);

export default router;