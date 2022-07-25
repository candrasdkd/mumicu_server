import jwt from "jsonwebtoken";

export const verifySuperAdmin = (req, res, next) => {
    const authHeader = req.headers['x-access-token'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(decoded.authLevel !== 1) return res.send({
            status: 403,
            message: 'Unauthorized'
         });
        if (err) return res.sendStatus(403);
        req.user_name = decoded.user_name;
        next();
    })
}

export const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers['x-access-token'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(decoded.authLevel !== 1) 
            if(decoded.authLevel !== 2)
            return res.send({
                status: 403,
                message: 'Unauthorized'
            });
        if (err) return res.sendStatus(403);
        req.user_name = decoded.user_name;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    const authHeader = req.headers['x-access-token'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(decoded.authLevel !== 3) return res.send({
            status: 403,
            message: 'Unauthorized'
         });
        if (err) return res.sendStatus(403);
        req.user_name = decoded.user_name;
        next();
    })
}