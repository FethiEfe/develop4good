const bcrypt = require("bcryptjs")

const getAllDevelopers = (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance.getAllDevelopers()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => console.log(err))

    // console.log(`getall session ${req.session.user.username}`)
}


const signupDev = async (req, res) => {
    const { username, email, password } = req.body;

    const db = req.app.get("db");
    const existingUser = await db.verifyuser([username])
    const existingChar = await db.verifychar([username])

    if (existingUser.length > 0 || existingChar.length > 0) {
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
            username: user.username,
            email: user.email
        }

        return res.status(200).json(req.session.user)

    }


}
signupChar = async (req, res) => {
    const { username, email, password } = req.body;

    const db = req.app.get("db")
    const existingUser = await db.verifyuser([username])
    const existingChar = await db.verifychar([username])

    if (existingUser.length > 0 || existingChar.length > 0) {
        res.status(403).json({
            error: "Username is taken"
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const registeredChar = await db.addCharities([username, email, hash]);
        const char = registeredChar[0];
        req.session.user = {

            char_id: char.char_id,
            username: char.username,
            email: char.email,
        }
        

        res.json(req.session.user)

    }


}


login = async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    const results = await db.verifyuser(username)

    if (results[0]) {
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (isMatch) {
            req.session.user = {
                username: results[0].username,
                email: results[0].email,
                id: results[0].id,
                first_name: results[0].first_name,
                last_name: results[0].last_name,
                email: results[0].email,
                linkedin: results[0].linkedin,
                skills: results[0].skills,
                img : results[0].img
            }
            res.json(req.session.user)
            
        } else {
            res.status(403).json("Wrong password")
        }
    } else {
        const checkChar = await db.verifychar(username)
        if (checkChar[0]) {
            const isMatch = await bcrypt.compare(
                password, checkChar[0].password
            );
            if (isMatch) {
                req.session.user = {
                    username: checkChar[0].username,
                    char_id: checkChar[0].char_id,
                    nameOfOrganization: checkChar[0].nameoforganization,
                    website: checkChar[0].website,
                    charemail: checkChar[0].email,
                    charLinkedin: checkChar[0].charlinkedin,
                    mission: checkChar[0].mission,
                    charimg: checkChar[0].charimg,
                }
                res.json(req.session.user)
                

            } else {
                res.status(403).json("Wrong password")
            }
        } else {
            res.status(403).json("wrong username")
        }

    }

};

logout = (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);

}

updateMyProfileInfo = async (req, res) => {
    const { id, first_name, last_name, email, linkedin, skills } = req.body

    const db = req.app.get("db")
    const newProfileInfo = await db.edit_profile_info([id, first_name, last_name, email, linkedin, skills])

    req.session.user = {

        first_name: newProfileInfo[0].first_name,
        last_name: newProfileInfo[0].last_name,
        email: newProfileInfo[0].email,
        linkedin: newProfileInfo[0].linkedin,
        skills: newProfileInfo[0].skills

    }

    res.json(req.session.user)

}

updateCharProfileInfo = async (req, res) => {
    const { char_id, nameOfOrganization, website, email, charLinkedin, mission } = req.body;
    const db = req.app.get("db")
    const newCharProfileInfo = await db.editCharProfileInfo([char_id, nameOfOrganization, website, email, charLinkedin, mission])
    req.session.user = {

        nameOfOrganization: newCharProfileInfo[0].nameoforganization,
        website: newCharProfileInfo[0].website,
        email: newCharProfileInfo[0].email,
        charLinkedin: newCharProfileInfo[0].charlinkedin,
        mission: newCharProfileInfo[0].mission

    }
    res.json(req.session.user)
    
}


module.exports = {
    signupDev,
    signupChar,
    getAllDevelopers,
    login,
    logout,
    updateMyProfileInfo,
    updateCharProfileInfo,
   

}