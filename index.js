const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.listen(3000, () => {
    console.log("App is running on port 3000");
});

app.post("/login", (req, res) => {
    const user = {
        id: 1,
        name: "Siki",
        email: "siki@test.com"
    };

    jwt.sign({ user }, "secretKey", { expiresIn: '300s' }, (err, token) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json({
                token
            });
        }
    });
});

app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretKey", (err, authData) => {
        if (err) {
            res.send({ result: "Invalid token" });
        } else {
            res.json({
                message: "Profile accessed",
                authData
            });
        }
    });
});

function verifyToken(req, res, next) {
    const bearHeader = req.headers['authorization'];
    if (typeof bearHeader !== 'undefined') {
        const bearer = bearHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.send({
            result: "Token is not valid"
        });
    }
}
