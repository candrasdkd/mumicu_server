import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routes/index.js";
import http from "http-server"
dotenv.config();
const app = express();
const port = process.env.PORT || 7777

const server = http.createServer(app)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(cookieParser());
app.use(router);

server.listen(port,() => {
    console.log(`this app is running on ${port}`)
})

