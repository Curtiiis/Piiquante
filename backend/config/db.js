const mongoose = require('mongoose')

//Connexion à MongoDB via Mongoose
mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_SERVER_1},${process.env.DB_SERVER_2},${process.env.DB_SERVER_3}/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-z5q7gf-shard-0&authSource=admin&retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
    )
.then(() => console.log(`Connected to MongoDB (${process.env.DB_NAME})!`))
.catch((err) => console.log('Connection failed to MongoDB !', err));
   
