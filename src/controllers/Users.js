import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const GetAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                auth_level: { [Op.gt]: 1 }
            },
            attributes: ['id', 'full_name', 'username', 'phone_number', 'status', 'gender', 'auth_level'],
        })
        const totalUsers = users.length
        const totalMalePraRemaja = users.filter(user => user.gender === 'Laki-Laki' && user.status === 'Pra Remaja').length
        const totalMaleRemaja = users.filter(user => user.gender === 'Laki-Laki' && user.status === 'Remaja').length
        const totalMaleUsiaNikah = users.filter(user => user.gender === 'Laki-Laki' && user.status === 'Usia Nikah').length
        const totalWomanPraRemaja = users.filter(user => user.gender === 'Perempuan' && user.status === 'Pra Remaja').length
        const totalWomanRemaja = users.filter(user => user.gender === 'Perempuan' && user.status === 'Remaja').length
        const totalWomanUsiaNikah = users.filter(user => user.gender === 'Perempuan' && user.status === 'Usia Nikah').length
        res.json({ 
            status: 200, 
            data: users, 
            totalUsers, 
            totalMalePraRemaja,
            totalWomanPraRemaja,
            totalMaleRemaja,
            totalWomanRemaja,
            totalMaleUsiaNikah,
            totalWomanUsiaNikah,
            message: 'Success' 
        });
    } catch (error) {
        console.log('Error Function GetUsers', error);
    }
}

export const Register = async (req, res) => {
    const { full_name, username, phone_number, gender, status } = req.body;
    const findUsername = await Users.findOne({ where: { username } })
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash('jamaah354', salt);
    if (full_name.length < 1 || username.length < 1 || phone_number.length < 1) {
        return res.status(400).json({ message: "Field empty" });
    } else if (findUsername) {
        return res.status(400).json({ message: "Username already used" })
    }
    try {
        await Users.create({
            full_name,
            username,
            phone_number,
            password: hashPassword,
            auth_level: 3,
            gender,
            status
        })
        const user = await Users.findAll({
            where: {
                username
            }
        });
        const id = user[0].id;
        const fullName = user[0].full_name;
        const userName = user[0].username;
        const authLevel = user[0].auth_level;
        const accessToken = jwt.sign({ id, fullName, userName, authLevel }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '365d'
        });
        const refreshToken = jwt.sign({ id, fullName, userName, authLevel }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '365d'
        });
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: id
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        const data = { accessToken, userInfo: { id, authLevel } }
        res.json({ status: 200, data, message: "Success" });
    } catch (error) {
        console.log('Error Function Register', error);
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                username: req.body.username
            }
        });
        // const match = await bcrypt.compare(req.body.password, user[0].password);
        // if(!match) return res.status(400).json({msg: "Wrong Password"});
        const id = user[0].id;
        const fullName = user[0].full_name;
        const userName = user[0].username;
        const authLevel = user[0].auth_level;
        const accessToken = jwt.sign({ id, fullName, userName, authLevel }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '365d'
        });
        const refreshToken = jwt.sign({ id, fullName, userName, authLevel }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '365d'
        });
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: id
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        const data = { accessToken, userInfo: { id, authLevel } }
        res.json({ status: 200, data, message: "Success" });
    } catch (error) {
        res.status(404).json({ message: "Username not found" });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}