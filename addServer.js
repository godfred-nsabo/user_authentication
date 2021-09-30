'use strict';

const express  = require('express');
const app = express();
const bcyrpt = require('bcrypt');

app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
    res.json(users)
});

app.post('/users', async (req, res)=>{
    try {
       let salt = await bcyrpt.genSalt();
       let hashPassword = await bcyrpt.hash(req.body.password, salt); 
       console.log(salt);
       console.log(hashPassword);
       let user = { name: req.body.name, password: hashPassword }
       users.push(user);
       res.status(201).send()
    } catch (error) {
        res.status(500).send();
        console.log(error);
    }

});

app.listen(3000);