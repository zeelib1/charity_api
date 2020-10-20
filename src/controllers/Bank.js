const Bank = require('../models/UserBank');

const BankController = {
    getAll: async (req, res) => {
        const bankData = await Bank.find({year:2017});
        res.json(bankData);
      },
      create : async (req, res) => {
        const { country,year } = req.body;
      
       await Bank.create({country, year});
       res.sendStatus(200);
      
    }
   
}

module.exports = BankController;
