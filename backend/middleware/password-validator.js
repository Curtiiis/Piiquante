const passwordValidator  = require('password-validator')

const passwordSchema = new passwordValidator()

    passwordSchema
    .is().min(8)          // Minimum length 8
    .is().max(100)        // Maximum length 100
    .has().uppercase()    // Must have uppercase letters
    .has().lowercase()    // Must have lowercase letters
    .has().digits(1)      // Must have at least 1 digit
    .has().not().spaces() // Should not have spaces
    .is().not().oneOf([
        // Blacklist these values
        'password',
        'PASSWORD',
        'Passw0rd',
        'PasswOrd',
        'Password', 
        'Password123'
    ])

module.exports = (req,res,next) => { 
    if(passwordSchema.validate(req.body.password)) {
        next();
    }
    else {
        res.status(401).json({error : 
            `Le format du mot de passe est incorrect : ${passwordSchema.validate("req.body.password", {list: true})}`
            })
    }
}