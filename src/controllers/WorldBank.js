const Bank = require('../models/UserBank');
const WorldBank = require('../models/WorldBank');

const WorldBankController = {
    getAll: async (req, res) => {
        const bankData = await WorldBank.find({});
        res.json(bankData);
      }
   
}

module.exports = WorldBankController;