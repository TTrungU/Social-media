const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {

            jwt.verify(token, "test", (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid")
                }
                // console.log(req)
                req.user = user

                next();
            })
        } else {
            res.status(401).json("you are not authenticated")
        }
    } catch (err) {
        console.log(err)
    }

}

module.exports = middleware


