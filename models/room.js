const mongoose = require('mongoose')


const roomSchema = new mongoose.Schema({

    roomNumber:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    roomType:{
        type:String,
        required:true,
        trim:true
    },
    bedsCount:{
        type:Number,
        required:true
    },
    roomPrice:{
        type:Number,
        required:true
    },
    adultsOcc:{
        type:Number,
        required:true
    },
    childOcc:{
        type:Number,
        required:true
    },
    hotelAssociated:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Hotel'
    }
},{
    timestamps:true
})

roomSchema.virtual('bookings',{
    ref: 'Booking',
    localField:'_id',
    foreignField: 'bookingsPerRoom'
})



const Room = mongoose.model('Room',roomSchema)

module.exports = Room