const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig, jwtSecret } = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const router = express.Router();

const organizerRegSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
});

const organizerLogSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
});



router.get("/", async (req, res) => {
    try {

        const con = await mysql.createConnection(dbConfig);
        const [ats] = await con.query("SELECT * FROM organizers")
        con.end();
        res.send(ats);

    } catch (error) {
        res.status(500).send({ error: error })
    }
});

router.post("/register", async (req, res) => {
    let organizer = req.body
    try {
        organizer = await organizerRegSchema.validateAsync(organizer);
    } catch (err) {
        res.status(400).send(err.details[0].message);
        return;
    }

    try {
        const hashPassword = bcrypt.hashSync(organizer.password);
        organizer.password = hashPassword;

        const con = await mysql.createConnection(dbConfig);
        const [pushOrganizer] = await con.query("INSERT INTO organizers SET ?", [organizer]);
        con.end();
        res.send(pushOrganizer)

    } catch (error) {
        res.status(500).send({ error: error });
    };
});

router.post('/login', async (req, res) => {
    let orgLog = req.body;

    try {
        orgLog = await organizerLogSchema.validateAsync(orgLog);
    } catch (err) {
        res.status(500).send(err.details[0].message);
        return;
    }

    try {
        const con = await mysql.createConnection(dbConfig);
        const [log] = await con.query("SELECT id, password FROM organizers WHERE userName = ?", [orgLog.userName]);
        con.end();
        if (!log.length) {
            return res.status(400).send({ error: "blogas vardas arba splaptažodis" });
        }
        const pass = bcrypt.compareSync(orgLog.password, log[0].password);
        if (!pass) {
            return res.status(400).send({ error: "blogas vardas arba splaptažodis" });
        }
        const tokenas = jwt.sign({ organizatoriaus_id: log[0].id }, jwtSecret);
        res.send({ tokenas, organizatoriaus_id: log[0].id });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error });
    }
});



module.exports = router;