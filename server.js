const express = require('express')
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config()

const PORT = process.env.PORT

const Toon = require('./models/toons')

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI
const db = mongoose.connection;
 

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('database connected');
})

db.on('error', (err) => {console.log('ERROR: ' , err)});
db.on('connected', () => { console.log('mongo connected')});
db.on('disconnected', () => {console.log('mongo disconnected')});

app.use(express.static('public'));//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const toonsController = require('./controllers/toonsController')

app.use('/toons', toonsController)



app.listen(PORT, () => {
    console.log('Server is running on PORT 3000');
})