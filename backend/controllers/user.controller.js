import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
    try {

        // res.setHeader('Access-Control-Allow-Credentials', 'true');

        const { fullName, email, phoneNo, password, role } = req.body
        // console.log(fullName, email, phoneNo, password, role)
        if (!fullName || !email || !phoneNo || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        const file = req.file;

        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }


        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "An user is already present with this email",
                success: false
            })
        }

        const hashPassword = await bcrypt.hash(password, 8);

        //if profile picture provided
        if (cloudResponse) {
            await User.create({
                fullName,
                email,
                phoneNo,
                password: hashPassword,
                role,
                profile: {
                    profilePhoto: cloudResponse.secure_url,
                }

            })
        }

        //if profile picture not provided
        else {
            await User.create({
                fullName,
                email,
                phoneNo,
                password: hashPassword,
                role
            })
        }


        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    }

    catch (err) {
        console.log("Error while creating user", err)
    }
}


//Login
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        //Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        }

        //Check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success: false
            })
        }
        const tockenData = {
            userId: user._id
        }
        const token = await jwt.sign(tockenData, process.env.SECRET_KEY, { expiresIn: '1d' })
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNo: user.phoneNo,
            role: user.role,
            profile: user.profile
        }


        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        })
    }

    catch (err) {
        console.log("Error while Logging In ", err)
    }
}



//LogOut
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged Out successfully",
            success: true
        })
    }

    catch (err) {
        console.log("Error while Looging Out", err)
    }
}

// //Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNo, bio, skills } = req.body;

        const file = req.file;
        //Cloudinary
        let cloudResponse
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }


        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; //middleware auth

        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        //Updating data
        if (fullName) {
            user.fullName = fullName
        }

        if (phoneNo) {
            user.phoneNo = phoneNo
        }

        if (email) {
            user.email = email
        }

        if (skills) {
            user.profile.skills = skillsArray
        }

        if (bio) {
            user.profile.bio = bio
        }

        //Resume
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url          //Saving the resume url
            user.profile.resumeOriginalName = file.originalname     //Saving the resume original file name 
        }

        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNo: user.phoneNo,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: `Peofile Successfully Updated ${user.fullName}`,
            user,
            success: true
        })
    }

    catch (err) {
        console.log("Error while Updating Profile", err)
    }
}


