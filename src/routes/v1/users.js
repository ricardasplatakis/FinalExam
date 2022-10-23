const express = require('express');
const mysql = require('mysql2/promise');
const { aCheck } = require("../../middlewares/authorize");
const { dbConfig } = require("../../config");
const Joi = require("joi");

const router = express.Router();

const userRegSchema = Joi.object({
    vardas: Joi.string().required(),
    pavarde: Joi.string().required(),
    pastas: Joi.string().required(),
    amzius: Joi.number().required(),
    organizerId: Joi.number().required(),
});

router.get("/:organizerId", aCheck, async (req, res) => {
    const organizerId = req.params.organizerId
    try {

        const con = await mysql.createConnection(dbConfig);
        const [ats] = await con.query(`SELECT * FROM users WHERE organizerId = ${organizerId}`)
        con.end();
        res.send(ats);

    } catch (error) {
        res.status(500).send({ error: error })
    }
});

router.post("/register", aCheck,async (req, res) => {
    let user = req.body

    try {
        user = await userRegSchema.validateAsync(user);
    } catch (err) {
        res.status(400).send(err.details[0].message);
        return;
    }

    try {
        const con = await mysql.createConnection(dbConfig);
        const [pushUSER] = await con.query("INSERT INTO users SET ?", [user]);
        con.end();
        res.send(pushUSER)

    } catch (error) {
        res.status(500).send({ error: error });
    };
});

router.delete("/:userId", aCheck, async (req, res) => {
    const userId = req.params.userId;
    try {
        const con = await mysql.createConnection(dbConfig);
        const [deleteUser] = await con.query("DELETE FROM users WHERE id = ?", [userId]);
        con.end();
        res.send(deleteUser)
    }catch(error) {
        res.status(500).send(error);
    }
});

router.patch("/update/:id", aCheck, async (req, res) => {
    const id = req.params.id;
    let user = req.body;
    console.log(user)
    try {
        const con = await mysql.createConnection(dbConfig);
        const [editUser] = await con.query("UPDATE users SET vardas = ?, pavarde = ?, pastas = ?, amzius = ? WHERE id = ?", [user.vardas, user.pavarde, user.pastas, user.amzius, id]);
        con.end();
        res.send(editUser)
    }catch(error) {
        res.status(500).send(error);
    }
});



module.exports = router;