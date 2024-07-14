const DoctorModel = require('../Models/DoctorModel.js');
const cloudinary = require('cloudinary');
const usermodel = require('../Models/User.js');
const NotificationModel = require('../Models/Notification.js');

class DoctorController {

    static applydoctorcontroller = async(req,res)=>{
        try{
            const id = req.user._id;
            // console.log(id);
            const doctor = await DoctorModel.findOne({ userId : id});
            if(doctor){
                return res.status(200).send({
                    success : true,
                    message : "Already exists",
                })
            }

            const user = await usermodel.findById(id);
            if(user && user.status === 'Rejected'){
                return res.status(200).send({
                    success : false,
                    message : 'Your Cannot Apply Again! Rejected'
                })
            }

            const {specialization ,experience, fees , registration} = req.body;
            if(!specialization || !experience || !fees || !registration){
                return res.status(200).send({success : false, message : "Please enter all fields"});
            }

            if(!req.files || Object.keys(req.files).length === 0){
                return res.status(200).send({success : false , message : "Please provide your certificate"});
            }

            const {certificate} = req.files;
            if(!certificate){
                res.status(200).send({
                    success : false, message : "Certificate Not Received",
                })
            }

            const allowedFormats = ["image/png", "image/jpeg", "image/webp","image/jpg"];
            
            if(!allowedFormats.includes(certificate.mimetype)){
                return res.status(200).send({
                    success : true, message : "Please Enter Valid Format"
                })
            }

            const cloudinaryresponse = await cloudinary.uploader.upload(
                certificate.tempFilePath,
            );

            if(!cloudinaryresponse){
                return res.status(200).send({success : false , message : "File Not Uploaded"});
            }

            const NewDoctor = new DoctorModel({
                userId : id,
                specialization,
                experience,
                fees,
                Certificate : {
                    public_id : cloudinaryresponse.public_id,
                    url : cloudinaryresponse.secure_url
                },
                registration
            })

            const savedDoctor = await DoctorModel.insertMany([NewDoctor]);
            return res.status(201).send({
                success : true,
                message : "Applied Successfully",
                Doctor : savedDoctor
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({success : false , message : "Server side error in case of applydoctor",error});
        }
    }

    static getalldoctorcontroller = async(req,res)=>{
        try{
            const id = req.user._id;//current user id
            // console.log(id);
            const Doctors = await DoctorModel.find({isDoctor : true}).find({userId : {$ne : id}}).populate("userId");
            return res.status(200).send({
                success : true,
                Doctors : Doctors
            })
        }catch(error){
            console.log(error);
            return res.status(200).send({
                success : false , message : "Server side error in case of getalldoctorcontroller",error});
        }
    }

    static getapplieddoctorscontroller = async(req,res)=>{
        try{
            const Doctors = await DoctorModel.find({isDoctor : false}).populate("userId");
            // console.log(Doctors);
            return res.status(200).send({
                success : true,
                message : "Desired Doctors",
                Doctors : Doctors
            })
        }catch(error){
            console.log(error);
            return res.status(200).send({
                success : true,message : "Server side error in case of getapplieddoctorcontroller",error
            })
        }
    }

    static acceptdoctorcontroller = async(req,res)=>{
        try{
            const {userId} = req.body
            // console.log(req.body);
            const user = await usermodel.findByIdAndUpdate({_id : userId},{
                isDoctor : true, status : "accepted"
            },{new : true});

            const Doctor = await DoctorModel.findOneAndUpdate(
                {userId : userId},
                {isDoctor : true}
            );

            const Notification = await new NotificationModel({
                userId : userId,
                message : "Your Application has been accepted!"
            }).save();
            if(Notification){
                const data = {
                    Notification : Notification,
                    id : userId
                }
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('UpdatedNotification',data);
            }

            return res.status(201).send({
                success : true,
                message : "Your Application has been accepted",
            })
        }catch(error){
            console.log(error);
            return res.status(200).send({
                success : true,message : "Server side error in case of acceptdoctorcontroller",error
            })
        }
    }

    static rejectdoctorcontroller = async(req,res)=>{
        try{
            const {userId} = req.body.userId;
            const user = await usermodel.findByIdAndUpdate({_id : userId},{
                isDoctor : false, status : "Rejected"
            });

            const DeletedDoctor = await DoctorModel.findOneAndDelete({userId : userId});

            const Notification = await new NotificationModel({
                userId : userId,
                message : "Your Application has been Rejected!"
            }).save();


            if(Notification){
                const data = {
                    Notification : Notification,
                    id : userId,
                }
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('UpdatedNotification',data);
            }


            return res.status(200).send({
                success : true,
                message : "Your Appliaction has been rejected",
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : true,message : "Server side error in case of rejectdoctorcontroller",error
            })
        }
    }

    static deletedoctorcontroller = async(req,res)=>{
        try{
            const {userId} = req.body ; //userId of the doctor
            const user = await usermodel.findByIdAndUpdate({_id : userId},{
                isDoctor : false , status : "pending"
            },{new : true});

            const DeletedDoctor = await DoctorModel.findOneAndDelete({userId : userId});
            //remove all appointments of the doctor

            
            return res.status(200).send({
                success : true,
                message : "Doctor Deleted Successfully"
            })
        }catch(error){
            return res.status(500).send({
                success : false,
                message : "server side error in case of deletedoctorcontroller",error
            })
        }
    }

    static getdetailscontroller = async(req,res)=>{
        try{
            const id = req.params.id;
            const findDetails = await DoctorModel.findById(id).populate('userId');
            return res.status(200).send({
                success : true,
                message : "Successfully got details",
                doctor : findDetails
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "server side error in case of getdetailscontroller",error
            })
        }
    }

    static updateprofileimagecontroller = async(req,res)=>{
        try{
            const {public_id} = req.body;
            const {image} = req.files;
            if(!req.files || Object.keys(req.files).length === 0){
                return res.status(200).send({
                    success : false,
                    message : "image not received"
                })
            }
            if(!public_id){
                return res.status(404).send({
                    success : false,
                    message : "public_id not received"
                })
            }
            const destroyimage = await cloudinary.uploader.destroy(public_id);
            if(destroyimage.result !== 'ok'){
                // console.log('destroyed');
                return res.status(200).send({
                    success : false,
                    message :"Image cannot be replaced"
                })
            }

            const allowedFormats = ["image/png", "image/jpeg", "image/webp","image/jpg"];
            if(!allowedFormats.includes(image.mimetype)){
                return res.status(200).send({
                    success : false,
                    message : "Format not allowed"
                })
            }

            const cloudinaryresponse = await cloudinary.uploader.upload(
                image.tempFilePath
            );
            if(!cloudinaryresponse){
                return res.status(200).send({
                    success : false,
                    message : "Cloudinary response not received"
                })
            }
            const id = req.user._id;

            const updatedDoctor = await usermodel.findByIdAndUpdate(id,{
                profile_pic : {
                    public_id : cloudinaryresponse.public_id,
                    url : cloudinaryresponse.secure_url
                }
            });

            return res.status(200).send({
                success : true,
                message : "profile_pic successfully updated",
                user : updatedDoctor
            })
            
        }catch(error){
            console.log(error);
            return res.status(500).send({success : false , error});
        }
    }
}

module.exports = DoctorController;