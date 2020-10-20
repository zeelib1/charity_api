const mongoose = require('mongoose');

const WorldBankSchema = new mongoose.Schema({
 country:String,
 year: { type: mongoose.Schema.Types.Number, ref: "User" },
 happinessRate: Number,
 happinessScore: Number, 
 income: Number,

})

module.exports = mongoose.model('WorldBank', WorldBankSchema, "worldgraph");
