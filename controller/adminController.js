const { PrismaClient } = require("@prisma/client")
const prisma=new PrismaClient()
const {hashPassword, verifyPasword}=require("../utils/password")
const { generateToken } = require("../utils/token")

const RegisterAdmin=async (req,res) => {
    try {
        const {email,password,username,avatar}=req.body

        const Findexistadmin=await prisma.admin.findFirst()
        if (Findexistadmin) {
            return res.status(400).json({
                status:400,
                message:"An admin already exists. Only one admin is allowed."
            })
        }
        const hiddenpass=hashPassword(password)
        await prisma.admin.create({
            data:{
                email:email,
                password:hiddenpass,
                username:username,
                avatar:avatar
            }
        })
        res.status(200).json({
            status:200,
            message:"Registered Successfully"
        })

    } catch (error) {
        res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

const LoginAdmin=async (req,res) => {
    try {
        const {email,password}=req.body
        const findadmin=await prisma.admin.findUnique({
            where:{
                email:email
            }
        })
        if (!findadmin) {
            return res.status(404).json({
                status:404,
                message:"Incorrect Email Please Check Your Email"
            })
        }
        const ispasswordValid=await verifyPasword(password,findadmin.password)
        if (!ispasswordValid) {
            return res.status(400).json({
                status:400,
                message:"Invalid Password"
            })
        }
        const token=generateToken({id:findadmin.id,email:findadmin.email,username:findadmin.username,avatar:findadmin.avatar})
        res.status(200).json({
            status:200,
            message:"Login Successfully",
            authToken:token
        })
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"Poor Connection Try Again ",
            error:error.message
        })
    }
}  

const updatepatch=async (req,res) => {
    try {
        const {adminId}=req.params
        const updatedata=req.body

        const updatedRecord=await prisma.admin.update({
            where:{id:parseInt(adminId)},
            data:updatedata
        })
        res.status(200).json({
            status: 200,
            message: 'Record updated successfully',
            data: updatedRecord,
        });
    } catch (error) {
        res.status(500).json({
            status:500,
            message:error.message
        })
    }
}



module.exports={
    RegisterAdmin,
    LoginAdmin,
    updatepatch
}