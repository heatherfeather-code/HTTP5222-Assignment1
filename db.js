const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DBNAME}`;

// mongodb+srv://<db_username>:<db_password>@cluster0.z4zds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//function to connect to mongodb
async function connect(){
    await mongoose.connect(dbUrl);
}

module.exports = {connect};