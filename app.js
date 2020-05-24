const express = require('express')
const mongoose = require('mongoose')
const hbs = require('hbs')
const path = require('path')
const Room = require('./models/room')
const Hotel = require('./models/hotel')
const Booking = require('./models/booking')
const User = require('./models/user')


var obj = require('./object')


const app = express();
const port = process.env.PORT || 3000

mongoose.connect('mongodb://127.0.0.1:27017',{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
//mongoose.on('connection',()=>console.log('DB Connected')) 
db.once('open',()=>{
    console.log('Connected to DB')
})

const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

var hotel1 = new Hotel({
    hotelName:'xyz',
    hotelCity:'delhi',
    hotelAddress:'loremmm',
    hotelZipCode:'110022'
});

var user1 = new User({
    userName:'abc',
    email:'abc@abc.com',
    password:'loremmms',
    phoneNumber:'9787987987'
});


app.use(express.json())

app.get('/',(req,res) => {
    res.render('index',{
        title:'HOTEL MANAGEMENT SYSTEM',
        name: 'Jatin Kumar'
    })
})

app.get('/admin',(req,res)=>{
    res.render('about',{
        title:'HOTEL MANAGEMENT SYSTEM',
        name: 'Jatin Kumar'
    })
})

app.post('/addRoom',(req,res)=>{
    console.log(req.body)
    var r = new Room({
        roomNumber:req.body.rNo,
        roomType:req.body.rType,
        bedsCount:req.body.bCount,
        roomPrice:req.body.rPrice,
        adultsOcc:req.body.aCount,
        childOcc:req.body.cCount,
        hotelAssociated:mongoose.Types.ObjectId(req.body.hId)
    })
    r.save((err,succ)=>{
        if(err){
            console.log(err)
        }
        else res.json({"congo":'Room Added.'+succ})
    })
})

app.delete('/deleteRoom',(req,res)=>{
    Room.deleteOne({_id:mongoose.Types.ObjectId(req.id)},(err,succ)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send('deleted:'+succ)
        }
    })
})

app.get('/getRoomsbyType',(req,res)=>{
    var type = req.query.type
    //console.log(type)
    var obj = Room.find({roomType:type}).populate({
        path:'rooms'
    }).exec((err,succ)=>{
        res.send(succ)
    })
})

app.get('/getRoomsbyPrice',(req,res)=>{
    var obj = Room.where('roomPrice').lt(parseFloat(req.query.price)).populate({
        path:'rooms'
    }).exec((err,rooms)=>{
        if(err){
            console.err(err)
        }
        else{
            res.send(rooms)
        }
    })
})

app.post('/bookRoom',(req,res)=>{
    var hotelId = req.body.hId
    var roomId = req.body.roomId
    var userId = req.body.userId
    var checkInDate = req.body.checkInDate
    var checkOutDate = req.body.checkOutDate
    var rooms = Room.find({hotelAssociated:hotelId}).populate({
        path:'rooms'
    }).exec((err,succ)=>{
        if(err){
            console.log(err)
        }
        else{
            var findRoom
            succ.forEach((doc)=>{
                if(doc._id==roomId){
                    console.log('hio')
                    findRoom = doc
                }
            })
            
            if(findRoom != undefined){
                var bookingPerRoom = Booking.find({bookingsPerRoom:mongoose.Types.ObjectId(findRoom._id)}).populate({
                                        path:'bookingPerPerson'
                                    }).exec((err,suc)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            console.log(suc)
                                            if(suc.length==0){
                                                console.log('hfi')
                                                var book = new Booking({
                                                    bookingStartTime: checkInDate,
                                                    bookingEndTime: checkOutDate,
                                                    bookingPrice: findRoom.roomPrice,
                                                    bookedBy: mongoose.Types.ObjectId(userId),
                                                    bookingsPerRoom: findRoom._id
                                                })
                                                book.save((err,succ)=>{
                                                    if(err){
                                                        console.log(err)
                                                    }
                                                    else{
                                                        res.send('Booking Succesful'+ succ)
                                                    }
                                                })
                                            }
                                        }
                                    })
            }
        }
    })
    res.send('dsda')
})

app.listen(port,()=>{
    console.log('server is up on: '+ port + ' ')
})