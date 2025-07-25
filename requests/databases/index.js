const { Sequelize } = require('sequelize'); 
const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(express.json())
app.use(cors())

app.get('/staff', async (req, res) => {
try {
        const [data] = await connection.promise().query(
            `SELECT * FROM ${process.env.DATABASE}.staff`);
            if(data.length > 0) return res.json(data);
            else return res.json({ message: "Staff not found" });
    } catch (error) {
        return res.json(error);
    }
});

app.get('/child', async (req, res) => {
    try {
        const [data] = await connection.promise().query(
            `SELECT * FROM ${process.env.DATABASE}.child`);
            if(data.length > 0) return res.json(data);
            else return res.json({ message: "Child not found" });
    } catch (error) {
        return res.json(error);
    }
});

app.post('/signin', async (req, res) => {
    let { email, password } = req.body;

    if(!email || !password) return res.status(401).json('Please provide all the values');

    try {
        const [data] = await connection.promise().query(`
            SELECT user_id, username, password
            FROM ${process.env.DATABASE}.users 
            WHERE email = ? `, email);
        if (data.length > 0) {
            const passResult = await bcrypt.compare(password, data[0].password);
            if(passResult){
                const token = await jwt.sign({payroll_id:data[0].payroll_id}, process.env.KEY,  { expiresIn: '1h' });
                return res.status(200).json({'token': token});    
            } else {
                return res.status(401).json({ message: 'Authentication failed!'});
            }
        } else {
            return res.json({ message: "Customer not found"});
        }

    } catch (error) {
        return res.json(error);
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});