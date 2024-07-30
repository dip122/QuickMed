const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cloudinary = require('cloudinary');
const connectDB = require('./Config/db');
const fileUpload = require('express-fileupload');
const authroutes = require('./Routes/authroutes');
const doctorroutes = require('./Routes/doctorRoutes');
const notificationroutes = require('./Routes/notificationRoutes');
const appointroutes = require('./Routes/AppointMentRoutes');
const contactroutes = require('./Routes/Contactroutes');
const presroutes = require('./Routes/Presrouter');
const {Server} = require('socket.io');
const Emitter = require('events');
// const 
const path = require('path');
dotenv.config();


connectDB();


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});//cloudinary configure

app.use(express.json());//for parsing the json data received from frontend


app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
);
//for forntend and backend integration purpose

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}))

app.use('/api/v1/auth',authroutes);
app.use('/api/v1/doctor',doctorroutes)
app.use('/api/v1/notification',notificationroutes)
app.use('/api/v1/appointment',appointroutes)
app.use('/api/v1/contact',contactroutes)
app.use('/api/v1/pres',presroutes)


const port = 9090;



//---------------Deployment----------------//

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1,'./frontend/build')))
    app.get('*',(req, res)=>{
        res.sendFile(path.resolve(__dirname1, './frontend', 'build', 'index.html'))
    });
}
else{
    app.get('*',(req, res)=>{
        res.send("API is running successfully.")
    });
}
//------------------Deployment---------------//


app.get('/',(req,res)=>{
    res.status(200).send("this is server side programming");
});

const server = app.listen(process.env.PORT||port,()=>{
    console.log(`Listening to the port ${port}`);
});
const eventEmitter = new Emitter();
app.set('eventEmitter',eventEmitter);

const io = new Server(server ,{
    pingTimeout : 60000,
    cors : {
        origin : process.env.FRONTEND_URL,
        methods : ["GET","POST","PUT","DELETE"],
        credentials : true
      }
});

io.on('connection',(socket)=>{
    socket.on('setup',(notification)=>{
        // console.log('socket connected')
        socket.join(notification);
        socket.emit('connected')
    })
});

eventEmitter.on('UpdatedNotification',(data)=>{
    io.to('Notification_handle').emit('UpdatedNotification',data);
})



