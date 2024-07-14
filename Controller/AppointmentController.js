const AppointModel = require('../Models/Appointment.js');
const Notification = require('../Models/Notification');
const usermodel = require('../Models/User');
class Appointment {

    static bookappointmentscontroller = async(req,res)=>{
        try{
            const id = req.user._id;
            // console.log(req.user);
            // console.log(id);
            const {date, time , doctorId,doctorname} = req.body;
            if(!date || !time || !doctorId){
                return res.status(200).send({success : false , messgae : "Please pass all fields"});
            }

            const isbooked = await AppointModel.find({userId : id, doctorId : doctorId, date : date});
            if(isbooked.length >0){
                return res.status(200).send({
                    success : false,
                    message : 'aready booked'
                })
            }
            const appointment = new AppointModel({
                userId : id,
                doctorId,
                date,
                time,
            });

            // console.log(appointment);

            const NotificationUser = Notification({
                userId : id,
                message : `You Booked appointment with Dr. ${doctorname}`
            });

            await NotificationUser.save();


            const getappointment = await appointment.save();
            return res.status(201).send({
                success : true,
                message : "Appointment created successfully",
                appointment : getappointment
            })

        }catch(error){
            console.log(error);
            return res.status(500).send({success : false, message : "Server side error in case of bookappointments",error});
        }
    }

    static completeappointscontroller = async(req,res)=>{
        try{
            const AppointMentId = req.body.appointmentid;
            const completestatus = await AppointModel.findByIdAndUpdate(AppointMentId,{
                status : "completed"
            }, { new : true }).populate('doctorId');


            const NotificationUser = Notification({
                userId : req.body.userId,
                message : `You have an appointment with Dr. ${completestatus.doctorId.firstname} ${completestatus.doctorId.lastname}`
            });

            await NotificationUser.save();

            const data = {
                Notification : NotificationUser,
                id : req.body.userId
            }

            const eventEmitter = req.app.get('eventEmitter');
            eventEmitter.emit('UpdatedNotification',data)

            const user = await usermodel.findById(req.body.userId);

            const NotificationDoctor =  Notification({
                userId : req.body.doctorId,//i have to send the notification to doctor
                message : `You have an appointment with user. ${user.firstname} ${user.lastname} `
            });

            await NotificationDoctor.save();

            const eventemitter = req.app.get('eventEmitter');
            const data2 = {
                Notification : NotificationDoctor,
                id : req.body.doctorId
            }
            eventemitter.emit('UpdatedNotification', data2)
            
            return res.status(200).send({
                success : true , message : "Appointment completed"
            });

        }catch(error){
            console.log(error);
            return res.status(500).send({success : false, message : "server side error in case of completeappoint",error});
        }
    }

    static getallappointscontroller = async(req,res)=>{
        try{
            const appointment = await AppointModel.find({})
                .populate('userId')
                .populate('doctorId');

            return res.status(200).send({success : true , appointments : appointment});
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false, 
                message : "Server side error in getallappointscontroller",error
            })
        }
    }

    static userappointscontroller = async(req,res)=>{
        try{
            const id = req.user._id;
            const appointments = await AppointModel.find({userId : id}).find({status : 'completed'})
                    .populate('userId')
                    .populate('doctorId');
            
            // console.log(id);
            
            return res.status(200).send({
                success : true,
                messgae : 'successfully received appointments',
                appointments
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({success : false, message : "Server side error in userappointscontroller",error});
        }
    }

    static isbookedscontroller = async(req,res)=>{
        try{
            const id = req.params.id;
            const {userId,doctorId,date} = req.body;
            const isbooked = await AppointModel.find({userId : userId , doctorId : doctorId , date : date});
            if(isbooked){
                return res.status(200).send({
                    success : false, message : "Already Booked"
                })
            }
            return res.status(200).send({
                success : true,
                message : "Not booked"
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false, message : "Server side error in isbookedscontroller",error
            })
        }
    }
}

module.exports = Appointment;