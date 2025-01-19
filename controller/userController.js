const { PrismaClient } = require("@prisma/client");
const { hashPassword, verifyPasword } = require("../utils/password");
const { generateToken } = require("../utils/token");

const prisma=new PrismaClient()


const createUser=async (req,res) => {
    try {
        const { username, email, password,phone } = req.body

        const finduser=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if (finduser) {
            return res.status(400).json({
                status:400,
                message:"Email Already Exist"
            })
        }
        const hashpass=hashPassword(password)
        await prisma.user.create({
            data:{
                email:email,
                password:hashpass,
                username:username,
                phone:phone
            }
        })
        res.status(200).json({
            status:200,
            message:"Account Created Successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"An Error Accured",
            error:error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password, latitude, longitude } = req.body;

        const foundUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!foundUser) {
            return res.status(404).json({
                status: 404,
                message: "User Not Found"
            });
        }

        const verifypass = await verifyPasword(password, foundUser.password);
        if (!verifypass) {
            return res.status(401).json({
                status: 401,
                message: "Invalid Password"
            });
        }

        // Update the user with the latitude, longitude, and activeAt time
        await prisma.user.update({
            where: {
                id: foundUser.id
            },
            data: {
                latitude: latitude,
                longitude: longitude,
                activeAt: new Date() // Set the current time as the activeAt value
            }
        });

        const token = generateToken({ id: foundUser.id, email: foundUser.email, username: foundUser.username });

        res.status(200).json({
            status: 200,
            message: "Login Successfully",
            authToken: token
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "An Error Occurred",
            error: error.message
        });
    }
};


const getallUser=async (req,res) => {
    try {
        const users=await prisma.user.findMany()
        res.status(200).json({
            status:200,
            message:"User Getting Successfully",
            data:users
        })
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"An Error Accured",
            error:error.message
        })
    }
}

const getoneUser=async (req,res) => {
    try {
        const {userId}=req.params
        const user=await prisma.user.findUnique({
            where:{id:parseInt(userId)}
        })
        if (!user) {
            res.status(404).json({
                status:404,
                message:"User Not Found"
            })
        }
        res.status(200).json({
            status:200,
            message:"User Getting Successfull",
            data:user
        })

    } catch (error) {
        res.status(500).json({
            status:500,
            message:"An Error Accured",
            error:error.message
        })
    }
}



// const updateUser=async (rewq,res) => {
//     try {
        
//     } catch (error) {
//         res.status(500).json({
//             status:500,
//             message:"An Error Accured",
//             error:error.message
//         })
//     }
// }

module.exports={
    createUser,
    loginUser,
    getallUser,
    getoneUser
}