const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3003

//MIDDLEWARE
app.use(express.json())

//mongoose
mongoose.connect('mongodb://localhost:27017/trailblazerDB', {
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

app.listen(PORT, () => {
    console.log('server is listening');
})