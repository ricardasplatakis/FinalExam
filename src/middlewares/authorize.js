const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config")

const aCheck = (req, res, next) => {
    const auth = req.headers.authorization;

    if(!auth) {
        return res.status(400).send( { error:"Reikalingas Token'as"} );
    }
    const tokenas = auth.split(" ")[1];
    try {
     const info = jwt.verify(tokenas, jwtSecret);
    req.user = {
       user_id: info.user_id,
    }
    next();
    }catch(err){
        res.status(401).send( {error: "Nepatvirtintas"} )
    }
};

module.exports = { aCheck };
