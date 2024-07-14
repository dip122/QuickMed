const usermodel = require('../Models/User');
const cloudinary = require('cloudinary');
const DoctorModel = require('../Models/DoctorModel.js');
const jwt = require('jsonwebtoken');
const {transporter} = require('../Config/emailConfig.js');

const {hashedPassword,comparepassword} = require('../Helper/authHelper');
const { GenerateToken } = require('../Config/Token');

class UserController {


    static registercontroller = async(req,res)=>{
        try{
            const {firstname,lastname , email ,password , confirmpassword , contact , address} = req.body;

            if(!firstname || !lastname || !email || !password || !contact || !address){
                return res.status(200).send({success : false, message : "Fill All The Fields"});
            }

            const user = await usermodel.findOne({email : req.body.email});
            if(user){
                return res.status(200).send({
                    success : false,
                    message : "User already exists"
                })
            }

            if(!req.files || Object.keys(req.files).length === 0){
                return res.status(200).send({
                    success : false,
                    message : "Profile_pic is not sent"
                })
            }
            const {profile_pic} = req.files;
            if(!profile_pic){
                return res.status(200).send({success : false,message : "Profile_pic is not sent"});
            }

            const allowedformats = ["image/png", "image/jpeg", "image/webp","image/jpg"];
            if(!allowedformats.includes(profile_pic.mimetype)){
                return res.status(200).send({
                    success : false,
                    message : "Please import an png or jpeg file"
                })
            }

            const cloudinaryresponse = await cloudinary.uploader.upload(
                profile_pic.tempFilePath
            )
            if(!cloudinaryresponse){
                return res.status(200).send({
                    success : false,
                    message : "File Not Uploaded"
                })
            }

            const hashedpassword = await hashedPassword(password);

            const newuser = new usermodel({
                firstname,
                lastname,
                email,
                password : hashedpassword,
                contact,
                address,
                profile_pic : {
                    public_id : cloudinaryresponse.public_id,
                    url : cloudinaryresponse.secure_url
                }
            });

            const InsertedUser = await usermodel.insertMany([newuser]);
            return res.status(201).send({
                success : true,
                message :"User Successfully Registered",
                user : InsertedUser
            });
        }catch(error){
            console.log(error);
            return res.status(505).send({success : false,message : "Server side error in registercontroller",error});
        }
    }

    static logincontroller = async(req,res)=>{
        try{
            const {email,password} = req.body;
            // console.log(email);
            if(!email || !password){
                return res.status(200).send({
                    success : false,
                    message : "Please enter email and password"
                })
            }
            const user = await usermodel.findOne({email : req.body.email});
            if(!user){
                return res.status(404).send({success : false , message : "User Not Found"});
            }

            const hashedpassword = user.password;
            const isMatch = await comparepassword(password,hashedpassword);
            if(!isMatch){
                return res.status(401).send({
                    success : false, message : "Password Do not Match"
                })
            }

            const token = GenerateToken(user._id);
            return res.status(200).send({
                success : true,
                message : "Successfully logged in",
                user : user,
                token,
            });

        }catch(error){
            console.log(error);
            return res.status(200).send({
                success : false,message : "Server side error in logincontroller",error})
        }
    }

    static getallusercontroller = async(req,res)=>{
        try{
            const user = await usermodel.find({}).select("-password");
            return res.status(200).send({
                success : true, 
                user : user
            })
        }catch(error){
            return res.status(500).sned({success : false, message : "Server side error in getalluserscontroller", error})
        }
    }

    static updatepasswordcontroller = async(req,res)=>{
        try{
            const {password} = req.body
            if(!password){
                return res.status(200).send({
                    success : false,
                    message : "Please provide the password"
                })
            }
            const newpassword = await hashedPassword(password);
            const id = req.user._id;
            // console.log(id);
            const updateduser = await usermodel.findByIdAndUpdate(id,{
                password : newpassword
            }, {new : true});

            return res.status(200).send({
                success : true, 
                message : "password updated successfully",
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "server side error in case of updatepasswordcontroller",error
            })
        }
    }

    static updatecontactcontroller = async(req,res)=>{
        try{
            const {contact,address} = req.body;
            if(!contact || !address) return res.status(200).send({success : false, message : "provide details"});

            const id = req.user._id;
            const updateduser = await usermodel.findByIdAndUpdate(id,{
                contact : contact,
                address : address
            }, {new : true});

            // console.log(updateduser);
            return res.status(200).send({
                success : true,
                message : "Contact Updated Successfully",
                user : updateduser
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of updatecontactcontroller",
                error
            })
        }
    }

    static deleteusercontroller = async(req,res)=>{
        try{
            const {userId} = req.body;
            // console.log(req.body);
            const deleteduser = await usermodel.findByIdAndDelete(userId);
            const deleteddoctor = await DoctorModel.deleteMany({userId : userId});
            return res.status(200).send({
                success : true,
                message : "USer deleted successfully"
            })
        }catch(error){
            console.log(error);
            res.status(500).send({success : false , message : "Server side error in case of deleteuser",error})
        }
    }

    static forgetpasswordcontroller = async(req,res)=>{
        try{
            const {email} = req.body;
            // console.log(email);
            if(!email){
                return res.status(200).send({
                    success : false,
                    message : "Please provide Email"
                })
            }
            const user = await usermodel.findOne({email : email});
            // console.log(user);
            if(!user){
                return res.status(200).send({
                    success : false,
                    message : "user does not exists"
                })
            }

            const token = jwt.sign({id : user._id},process.env.SECRET_KEY, {expiresIn : "10m"});
            const link = `${process.env.FRONTEND_URL}/resetpassword/${token}`;
            const info = await transporter.sendMail({
                from : process.env.EMAIL,
                to : email,
                Subject : "ForgetPassowrd Email",
                text : "Link is valid for 10 min",
                html : `<a href = "${link}">${link}</a>`
            });

            return res.status(200).send({
                success : true,
                message : "Email sent successfully"
            })
            
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of forgetpasswordcontroller",
                error
            })
        }
    }

    static resetpasswordcontroller = async(req,res)=>{
        try{
            const {password} = req.body;
            const {token} = req.params;
            if(!password || !token){
                return res.status(200).send({
                    success : false,
                    message : "Password and token is missing"
                })
            }

            const decode = jwt.verify(token,process.env.SECRET_KEY);
            const user = await usermodel.findById(decode.id);
            const newpassword = await hashedPassword(password);
            const updateduser = await usermodel.findByIdAndUpdate(user._id, {
                password : newpassword,
            }, {new : true});

            return res.status(200).send({
                success : true,
                message : "Successfully Password Updated",
                user : updateduser
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of resetpasswordcontroller",
                error
            })
        }
    }
}



module.exports = UserController;