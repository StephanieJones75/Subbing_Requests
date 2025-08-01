const { Sequelize } = require('sequelize'); 
const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(express.json())
app.use(cors())

// const Child = require('./models/child');
// const Staff = require('./models/staff');
// const Requests = require('./models/requests');

// const child_router = require('./routes/child');
// const requests_router = require('./routes/requests');

// Requests.hasmany(Child, {
//     foreignKey: 'child',
//     sourceKey: 'request_id'
// });

// Child.belongsTo(Requests, {
//     foreignKey: 'child',
//     targetKey: 'request_id'
// });

// app.get('/', (req, res) => {
//     res.send('Welcome to the Subbing Database API');
// });

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
app.get('/staff/:payroll_id', async (req, res) => {
    let payroll_id = req.params.id;
    
    if (!payroll_id || isNaN(payroll_id)) return res.status(400).json({ message: "Please provide a Staff ID" });
    
    try {
        const [data] = await connection.promise().query(
            `SELECT * 
                FROM ${process.env.DATABASE}.staff
                WHERE payroll_id = ?`, payroll_id);

        if (data.length > 0) return res.send(data);
        else return  res.json({ message: "Staff not found" });
    } catch (error) {
        return  res.json(error);
    }

});

// app.get('/child/:childid', async (req, res) => {
// let childid = req.params.childid;
    
//     if (!childid || isNaN(childid)) return res.status(400).json({ message: "Please provide a Child ID" });
    
//        try {
//         const [data] = await connection.promise().query(
//             `SELECT * FROM ${process.env.DATABASE}.child WHERE ChildId = ?`, childid);
//             if(data.length > 0) return res.json(data);
//             else return res.json({ message: "Child not found" });
//     } catch (error) {
//         return res.json(error);
//     }
// });

// app.get('/requests', async (req, res) => {
//     try {
//         const [data] = await connection.promise().query(
//             `SELECT * FROM ${process.env.DATABASE}.requests`);
//             if(data.length > 0) return res.json(data);
//             else return res.json({ message: "Request not found" });
//     } catch (error) {
//         return res.json(error);
//     }
// });

// app.post('/requests', async (req, res) => {
//     let { child, team, date_requested, date_required1} = req.body; 
//     try {
//         const [data] = await connection.promise().query(
//             `SELECT * FROM ${process.env.DATABASE}.requests`);
//             if(data.length > 0) return res.json(data);
//             else return res.json({ message: "Request created successfully" });
//     } catch (error) {
//         return res.json(error);
//     }
// });

app.post('/signin', async (req, res) => {
    let { email, password } = req.body;

    if(!email || !password) return res.status(401).json('Please provide all the values');

    try {
        const [data] = await connection.promise().query(`
            SELECT payroll_id , email, password
            FROM ${process.env.DATABASE}.staff 
            WHERE email = ? `, email);
        if (data.length > 0) {
            // const passResult = await bcrypt.compare(password, data[0].password); Uncomment when using bcrypt
            const passResult = password === data[0].password; // For testing purposes, replace with bcrypt comparison in production
            if (data[0].email === email && data[0].password === password){
            // if(passResult){
            console.log('User authenticated successfully', process.env.KEY);
                const token = await jwt.sign({payroll_id:data[0].payroll_id}, process.env.KEY,  { expiresIn: '1h' });
                console.log(token);
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