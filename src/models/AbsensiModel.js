import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Absensi = db.define('absensi', {
    username: {
        type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: 'Hadir',
    },
    created_at: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        validate: {
            customValidator(value) {
                console.log(value);
              if (new Date(value) === new Date()) {
                throw new Error("Kamu sudah absen sebelumnya");
              }
            },
          },
    },
}, {
    freezeTableName: true,
    timestamps: false
});

(async () => {
    await db.sync()
})

export default Absensi