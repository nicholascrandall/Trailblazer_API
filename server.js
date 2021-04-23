require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const app = express()
const cors = require('cors')
const session = require('express-session');

//MIDDLEWARE
app.use(express.json())
app.use(session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: false
}))

//Cors
const whitelist = ['http://localhost:3000',process.env.PROD_URL]
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials : true
}

app.use(cors(corsOptions))

//mongoose
mongoose.connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

const db = mongoose.connection;
db.once('open', ()=> console.log('DB connected...'));
db.on('error', (error)=> console.log(error.message));
db.on('disconnected', ()=> console.log('Mongoose disconnected...'));

//CONTROLLERS
app.use('/event', require('./controllers/eventController'))
app.use('/user', require('./controllers/userController'))
app.use('/session', require('./controllers/sessionController'))
app.use('/comment', require('./controllers/commentController'))
app.use('/profile', require('./controllers/profileController'))

app.listen(PORT, () => {
    console.log('server is listening');
})