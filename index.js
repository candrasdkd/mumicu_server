import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routes/index.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(cookieParser());
app.use(router);

app.listen(port, () => console.log(`Server running at port http://localhost:${port}`));