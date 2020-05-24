const mongoose = require('mongoose')


const hotelSchema = new mongoose.Schema({
    hotelName: {
        type:String,
        required:true,
        trim:true
    },
    hotelCity:{
        type:String,
        required:true,
        trim:true
    },
    hotelAddress:{
        type:String,
        required:true,
        trim:true
    },
    hotelZipCode:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
})

hotelSchema.virtual('rooms',{
    ref: 'Room',
    localField:'_id',
    foreignField: 'hotelAssociated'
})

const Hotel = mongoose.model('Hotel',hotelSchema)

module.exports = Hotel