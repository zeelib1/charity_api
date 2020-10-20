const bcrypt = require('bcrypt');
const User = require('../models/User');

const UserController = {
    getAll:async(req, res) => {
        const result = await User.find({})
        res.json(result);

    },
    create :(req, res) => {
        const { username, password } = req.body;
        bcrypt.hash(password, 10, async function(err, hash){
       await User.create({username, password: hash});
       res.sendStatus(200);
        });
    }
}

module.exports = UserController;
