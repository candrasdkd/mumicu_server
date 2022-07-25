import { Sequelize } from "sequelize";

const db = new Sequelize('db_mumicu', 'root', '', {
    host: "localhost",
    dialect: "mysql"
})

export default db