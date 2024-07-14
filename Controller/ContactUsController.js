const contactModel = require('../Models/ContactModel');
class ContactUS {
    static contactcontroller = async(req,res)=>{
        try{
            const {name, email , description} = req.body;
            if(!name || !email || !description){
                return res.status(200).send({success : false , message : "Please Fill All Fields"});
            }
            const contacted = new contactModel({name, email, description}).save();
            return res.status(201).send({
                success : true,
                message : "Successflly Contacted",
                contact : contacted
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false, message : "Server side error",error
            })
        }
    }
    static getcontactcontroller = async(req,res)=>{
        try{
            const getcontacts = await contactModel.find({});
            return res.status(200).send({
                success : true , message : "All Contacts", contacts : getcontacts
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false, message : "Server side error",error
            })
        }
    }
    static deletecontactcontroller = async(req,res)=>{
        try{
            const id = req.params.id;
            const deletedcontact = await contactModel.findByIdAndDelete(id);
            return res.status(200).send({
                success : true,
                message : "successfully deleted"
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false, 
                message : "Server side error in case of deletecontactcontroller",
                error
            })
        }
    }
}

module.exports = ContactUS;