const mongoose = require('mongoose');
const {Schema, model} = mongoose

const toonSchema = new Schema({
    class: String,
    name: String,
    description: String,
    img: String,
    str: {type: Number, min: 0},
    dex: {type: Number, min: 0},
    con: {type: Number, min: 0},
    int: {type: Number, min: 0},
    wis: {type: Number, min: 0},
    charm: {type: Number, min: 0}
})


const Toon = model('toon', toonSchema)


module.exports = Toon;