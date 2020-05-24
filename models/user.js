const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    phoneNumber: {
        type: String,
        required:true,
        trim:true
    }
},{
    timestamps:true
})

userSchema.virtual('bookings',{
    ref: 'Booking',
    localField:'_id',
    foreignField: 'bookedBy'
})


const User = mongoose.model('User',userSchema)

module.exports = User