import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,    
    },
    logo: {
        type: String,//URl of Company Logo
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
}, { timestamps: true, versionKey: false })

export const Company = mongoose.model("Company", companySchema)