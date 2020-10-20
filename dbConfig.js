const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://zeedb:zeedb@cluster0.bbjdh.mongodb.net/charity?retryWrites=true&w=majority'
, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useUnifiedTopology:true
});


const db  = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.info("Mongoose sucessfully connected!")
});

module.exports = db;