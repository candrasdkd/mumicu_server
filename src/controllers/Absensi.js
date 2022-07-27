import Absensi from "../models/AbsensiModel.js";
import Users from "../models/UserModel.js";
import { Op, Sequelize } from "sequelize";
import Moment from "moment";

export const ManualAbsensi = async (req, res) => {
    let body = req.body
    let usersNotAbsen = []
    let usersHasAbsen = []
    let totalUsersHasAbsent = 0
    for (let index = 0; index < body.length; index++) {
        const hasAbsen = await Absensi.findAll({
            where: {
                user_id: body[index].user_id,
                created_at: Moment(body[index].created_at).format("YYYY-MM-DD")
            },
        });

        if (hasAbsen.length === 0) {
            usersNotAbsen.push(body[index])
        } else {
            usersHasAbsen.push(body[index])
            totalUsersHasAbsent += hasAbsen.length
        }
    }

    try {
        if (usersNotAbsen.length > 0 && usersHasAbsen.length === 0) {
            await Absensi.bulkCreate(usersNotAbsen)
            res.json({ status: 200, message: "Success absen" });
        } else {
            return res.status(400).json({ status: 400, message: `Ada ${totalUsersHasAbsent} user yang sudah absen` });
        }
    } catch (error) {
        console.log('Error in Function Manual Absensi', error);
    }
}

export const ScanAbsensi = async (req, res) => {
    const { username, user_id, created_at } = req.body;
    const hasAbsen = await Absensi.findAll({
        where: {
            user_id,
            created_at: Moment(created_at).format("YYYY-MM-DD")
        }
    });

    try {
        if (hasAbsen.length === 0) {
            await Absensi.create({
                username,
                user_id: parseInt(user_id),
                created_at
            })
            res.json({ status: 200, message: "Success absen" });
        } else {
            return res.status(400).json({ message: "Kamu Sudah Absen" });
        }
    } catch (error) {
        console.log('Error in Function Scan Absensi', error);
    }
}

export const TotalAttendance = async (req, res) => {
    const { date } = req.query
    let d = new Date(date)
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    try {
        Users.hasMany(Absensi, { foreignKey: 'id' })
        Absensi.belongsTo(Users, { foreignKey: 'user_id' })
        const result = await Absensi.findAll({
            where: month ? {
                [Op.and]: [{ [Op.like]: Sequelize.where(Sequelize.fn("month", Sequelize.col("created_at")), month) },
                { [Op.like]: Sequelize.where(Sequelize.fn("year", Sequelize.col("created_at")), year) }]
            } :
                {
                    id: {
                        [Op.gt]: 0
                    }
                },
            attributes: [['created_at', 'date']],
            include: {
                model: Users,
                attributes: ['id', ['full_name', 'name'], 'gender', 'status'],
            },
        })

        let prefixes = ['0', '1', '2', '3', '4', '5',];
        let firstWeekTotal = []
        let secondWeekTotal = []
        let thirdWeekTotal = []
        let fourthWeekTotal = []
        let fifthWeekTotal = []

        result.map((item) => {
            let formatDate = new Date(item.dataValues.date)
            let adjustedDate = formatDate.getDate() + formatDate.getDay();
            if (parseInt(prefixes[0 | adjustedDate / 7]) === 1) {
                firstWeekTotal.push(item.dataValues)
            }
            if (parseInt(prefixes[0 | adjustedDate / 7]) === 2) {
                secondWeekTotal.push(item.dataValues)
            }
            if (parseInt(prefixes[0 | adjustedDate / 7]) === 3) {
                thirdWeekTotal.push(item.dataValues)
            }
            if (parseInt(prefixes[0 | adjustedDate / 7]) === 4) {
                fourthWeekTotal.push(item.dataValues)
            }
            if (parseInt(prefixes[0 | adjustedDate / 7]) === 5) {
                fifthWeekTotal.push(item.dataValues)
            }
        })

        res.json({
            status: 200,
            firstWeekTotal: firstWeekTotal.length,
            secondWeekTotal: secondWeekTotal.length,
            thirdWeekTotal: thirdWeekTotal.length,
            fourthWeekTotal: fourthWeekTotal.length,
            fifthWeekTotal: fifthWeekTotal.length,
            message: "Success"
        });

    } catch (error) {
        console.log('Error in Function Total Attendance', error);
    }
}
