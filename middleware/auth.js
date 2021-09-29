import { verifyToken } from '../helpers/auth.js';

const auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        req.user = verifyToken(token);
    }catch(err) {
        return res.status(401).send("Invalid Token");
    }
    return next()
}

export default auth;