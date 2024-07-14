const NotificationModel = require('../Models/Notification');
class Notification {

    static getallnotification = async(req,res)=>{
        try{
            const id = req.user._id;
            const notifications = await NotificationModel.find({userId : id}).populate('userId');
            return res.status(200).send({
                success : true,
                notifications : notifications
            })
        }catch(error){
            return res.status(500).send({success :false , message : "Server side error in notification",error});
        }
    }

    static deleteallnotification = async(req,res)=>{
        try{
            const id = req.params.id;
            const DeletedNotifications = await NotificationModel.findByIdAndDelete(id);
            return res.status(200).send({success : true , message : 'Notification Deleted'});
        }catch(error){
            console.log(error);
            return res.status(500).send({success :false , message : "Server side error in notification",error});
        }
    }

}

module.exports = Notification;