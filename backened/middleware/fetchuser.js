const jwt = require('jsonwebtoken');
const JWT_secret = "ayushisagoodboy$";

function fetchuser(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authenticate with a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_secret);
        req.user = data.user;
        next();
    } catch (err) {
        res.status(401).send({ error: "please authenticate with a valid token" })
    }
}

module.exports = fetchuser;