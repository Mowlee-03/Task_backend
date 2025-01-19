const { PrismaClient } = require("@prisma/client");
const prisma=new PrismaClient()

const creatProperty=async (req,res) => {
    try {
        const {
        title,
        price,
        location,
        bedrooms,
        bathrooms,
        area,
        images,
        type,
        category,
        district
        }=req.body
        if (!title || !price || !location) {
            return res.status(400).json({ message: "Missing required fields" });
          }
        await prisma.property.create({
            data:{
                title,
                price,
                location,
                bedrooms,
                bathrooms,
                area,
                images,
                type,
                category,
                district
            }
        })
        res.status(200).json({
            status:200,
            message:"Property Posted Successfully"
        })

    } catch (error) {
        res.status(500).json({
            status:500,
            message:"An Error Accurred",
            error:error.message
        })
    }
}
const Allproperty=async (req,res) => {
    try {
        const properties=await prisma.property.findMany()
        if (!properties) {
            return res.status(400).json({
                status:400,
                message:"Error in Fetching Properties"
            })
        }
        res.status(200).json({
            status:200,
            message:"Fetching Properties Successfully",
            data:properties
        })
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"An Error Accurred",
            error:error.message
        })
    }
}
const viewProperty=async (req,res) => {
    try {
        const {propertyId}=req.params

        const property=await prisma.property.findUnique({
            where:{
                id:parseInt(propertyId)
            }
        })
        if (!property) {
            return res.status(404).json({
                status:404,
                message:"Property Not Found"
            })
        }
        res.status(200).json({
            status:200,
            message:"Property Fetching Successfull",
            data:property
        })
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"An Error Accurred",
            error:error.message
        })
    }
}


module.exports={
    creatProperty,
    viewProperty,
    Allproperty
}