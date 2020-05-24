const mongoose = require('mongoose')

const room_booking = new mongoose.Schema({

    room:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Hotel'
    }
})