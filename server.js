const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')
const users = require("./routes/api/users");
const path = require('path');
const app = express();

//BodyParser middleware 

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//DB config 
const db = require('./config/keys');
const port = process.env.PORT || 5000; // process.env is herokus port if u choose to deploy the app there

//Connect to mongoDB
mongoose.connect(
    process.env.MONGODB_URI || db.mongoURI , // this is only if u have a heroku verified account to deploy the application
    {useNewUrlParser:true,
        useUnifiedTopology: true}
)
.then(()=> console.log("MongoDB successfully connected!"))
.catch(err => console.log(err));
app.use(cors());
app.options('*',cors())
//Passport middleware 
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Routes 
app.use("/api/users",users)

//serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //set static folder 
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(port,()=>console.log(`Server is up and running on ${port} !`));