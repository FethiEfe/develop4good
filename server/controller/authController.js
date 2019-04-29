const bcrypt = require("bcryptjs")

const getAllDevelopers = (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance.getAllDevelopers()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => console.log(err))

    console.log(`getall session ${req.session.user.username}`)
}


const signupDev = async (req, res) => {
    const { username, email, password } = req.body;

    const db = req.app.get("db");
    const existingUser = await db.verifyuser([username])
    const existingChar = await db.verifychar([username])

    if (existingUser.length > 0 || existingChar > 0) {
        res.status(403).json({
            error: "Username is taken"
        })
    } else {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const registeredUser = await db.addDeveloper([username, email, hash]);
        const user = registeredUser[0];

        req.session.user = {
            id: user.id,
            username: user.username
        }

        return res.status(200).json(req.session.user)
        
    }


}



    login = async (req, res) => {
        const { username, password } = req.body;
        console.log(req.body)
        const db = req.app.get("db");
        const results = await db.verifyuser(username)
        if (results[0]) {
            const isMatch = await bcrypt.compare(password, results[0].password);
            if (isMatch) {
                req.session.user = {
                    username: results[0].username,
                }
                res.json({ username: results[0].username })
            } else {
                res.status(403).json("Wrong password")
            }
        } else   {
            const checkChar = await db.verifychar(username)
            if (checkChar[0]) {
                const isMatch = await bcrypt.compare(
                    password, results[0].password
                );
                if (isMatch) {
                    req.session.user = {
                        username: results[0].username,
                    }
                    res.json({ username: results[0].username })
                } else {
                    res.status(403).json("Wrong password")
                }
            }else{
                res.status(403).json("wrong username")
            }

        } 
        console.log(`login session ${req.session.user}`)
    };

    logout =  (req, res) => {
        req.session.destroy();
        // return res.status(200).json(req.session)
        return res.sendStatus(200);
        console.log(`logout session ${req.session.user.username}`)
    }


module.exports = {
    signupDev,
    getAllDevelopers,
    login,
    logout
}