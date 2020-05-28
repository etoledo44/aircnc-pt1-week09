//index, show, store, update, destroy
const User = require('../models/User')
module.exports = {
    async store(req, res) {
        const email = req.body.email // const { email } = req.body, desestruturando, pegando o email do corpo 

        let user = await User.create({ email: email })
        console.log('*** resposta do mongo', user);

        if (!user) {
            user = await User.create({
                email: email
            })
            console.log('usuario-->', user)
        }
        return res.json(user)
    }
}