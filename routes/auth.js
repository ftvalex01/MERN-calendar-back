const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos.js')
const { createUser, tokenCheck, loginUser } = require('../controllers/auth')

const router = Router()

router.post('/new',
 [
    check('name','Name is required').not().isEmpty(),
    check('email','Email is not valid').isEmail(),
    check('password','the password must have more than 6 characters').isLength({min:6}),
    validarCampos
], 
createUser
)

router.post('/',
[
    check('email','Email is not valid').isEmail(),
    check('password','the password is not valid').isLength({min:6}),
    validarCampos
],
loginUser
)

router.get('/renew',tokenCheck)




module.exports = router;
