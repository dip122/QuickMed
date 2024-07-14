const presmodel = require('../Models/Prescription');
const cloudinary = require('cloudinary');
class PresController {

    static postprescriptioncontroller = async(req,res)=>{
        try{
            const id =req.user._id;//id of the User
            const {name,Medicines,Date} = req.body;
            if(!name || !Date){
                return res.status(404).send({message : "Fill all the fields"});
            }

            if(!req.files || Object.keys(req.files).length === 0){
                return res.status(400).send({success : false , message : "No file received"});
            }

            const {image} = req.files;
            if(!image){
                return res.status(404).send({message : "Please upload the file"});
            }
            const allowedFormats = ["image/png", "image/jpg","image/jpeg","image/webp"];
            if(!allowedFormats.includes(image.mimetype)){
                return res.status(200).send({
                    success : false,
                    message : "Please upload appropiate File Format"
                })
            }
            const cloudinaryresponse = await cloudinary.uploader.upload(
                image.tempFilePath
            );

            if(!cloudinaryresponse){
                return res.status(200).send({
                    success : false,
                    message : "File Not Uploaded successfully"
                })
            }
            const prescription = await presmodel({
                userid : id,
                DoctorName : name,
                Medicines:Medicines,
                Date : Date,
                image : {
                    public_id : cloudinaryresponse.public_id,
                    url : cloudinaryresponse.secure_url
                }
            }).save();

            return res.status(201).send({
                success : true,
                message : "successfully saved the prescription",
                prescription
            })

        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : true,
                message : "Server side error in case of postprescriptioncontroller",
                error,
            })
        }
    }
    static getprescriptioncontroller = async(req,res)=>{
        try{
            const id = req.user._id;
            const prescriptions = await presmodel.find({userid : id});
            return res.status(200).send({
                success : true ,
                message : "Successfully got all prescription",
                prescriptions
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false , message : "Server side error in case of postprescriptioncontroller", error
            })
        }
    }
    static deleteprescriptioncontroller = async(req,res)=>{
        try{
            const id = req.params.id;
            const deletedprescription = await presmodel.findByIdAndDelete(id);
            return res.status(200).send({
                success : true,
                message : "All prescription Deleted",
                prescription : deletedprescription
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of deleteprescriptioncontroller", error
            })
        }
    }
}

module.exports = PresController;