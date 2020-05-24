const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({

    bookingStartTime:{
        type:String,
        required:true
    },
    bookingEndTime:{
        type:String,
        required:true
    },
    bookingPrice:{
        type:Number,
        required:true
    },
    bookedBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    bookingsPerRoom:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Room'
    }
})

const Booking = mongoose.model('Booking',bookingSchema)

module.exports = Booking