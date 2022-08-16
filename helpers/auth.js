const jwt = require("jsonwebtoken");

module.exports = (credentials = []) => {
    return (req, res, next) => {
        //Allow for a String or Array
        if(typeof credentials === "string") {
            credentials = [credentials];
        }
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
                    // No Error, JWT is Good
                    
                    //Checking for Credentials being passed in
                    if(credentials.length > 0) {
                        if (
                            decoded.scopes &&
                            decoded.scopes.length && 
                            credentials.some(cred => decoded.scopes.indexOf(cred) >= 0)
                            ) {
                            next();
                        } else {
                            return res.status(401).send("Error: Access Denied !");
                        }
                    } else {
                        //No credentials Needed, User already Authorized
                        next();
                    }

                });
            }
            /*
        } catch (error) {
            res.status(400).send("Invalid token");
        }
        */
    };
};
