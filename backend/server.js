const express = require('express');
const cors = require('cors');
const uuid = require('uuid/v4');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DUMMY_USERS = []; //just some in-memory storage for now

app.get('/users', (req, res, next) => {
    res.status(200).json({ users: DUMMY_USERS });
});

app.post('/user', (req, res, next) => {

    const { email, password } = req.body;

    if (!email || email.trim().length === 0 || !password || password.trim().length === 0) {
        return res.status(400).json({
            message: 'Invalid input, please enter a valid email and password.'
        });
    }

    const createdUser = {
        id: uuid(),
        email,
        password
    };

    DUMMY_USERS.push(createdUser);

    res
        .status(201)
        .json({ message: 'Created new user.', user: createdUser });
});


app.listen(5000, () => {
    console.log('App listening on port 5000');
}); // start Node + Express server on port 5000