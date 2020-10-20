const mongoose = require('mongoose');

const UserBankSchema = new mongoose.Schema({
 country:String,
 year: Number,
 happinessRate: Number,
 happinessScore: Number, 
 income: Number,
 miserableWord: String,
 id_user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

module.exports = mongoose.model('UserBank', UserBankSchema, "charity" );
 