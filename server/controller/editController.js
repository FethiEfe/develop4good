module.exports = {
    updateMyProfileInfo: async (req,res) => {
        const {id, first_name, last_name, email, linkedin, skills} = req.body
        
        const db = req.app.get("db")
        db.edit_profile_info([id,first_name, last_name, email, linkedin, skills])
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            res.status(500).json({errorMessage: "something wrong with update"})
            console.log(err)
        })
    
        // req.session.user = {
         
        //     id: newProfileInfo[0].id,
        //     first_name: newProfileInfo[0].first_name,
        //     last_name: newProfileInfo[0].last_name,
        //     email: newProfileInfo[0].email,
        //     linkedin: newProfileInfo[0].linkedin,
        //     skills:newProfileInfo[0].skills

        // }

        
    }
}