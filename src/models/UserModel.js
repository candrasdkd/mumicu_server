import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    full_name: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
    },
    phone_number: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.TEXT,
    },
    refresh_token: {
        type: DataTypes.TEXT,
    },
    auth_level:{
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false
});

(async () => {
    await db.sync()
})

export default Users