const jwt = require("jsonwebtoken");

module.exports = () => {
    return (req, res, next) => {
        //try {
            //Find JWT in Headers
            const token = req.headers["authorization"];
            if (!token) {
                return res.status(401).send("Access denied.");
            }else {
                //Validate JWT
                const tokenBody = token.slice(7);
                jwt.verify(tokenBody, process.env.secret, (err, decoded) => {
                    if(err) {
                        console.log(`JWT Error: ${err}`)
                        return res.status(401).send("Error: Access Denied !");
                    }                    
                });
                // No Error, JWT is Good

                next();
            }
/*
        } catch (error) {
            res.status(400).send("Invalid token");
        }
        */
    };
};
