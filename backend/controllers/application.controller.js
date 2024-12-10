import { Application } from '../models/application.model.js'
import { Job } from '../models/job.model.js'

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id // or const {id:jobId}=req.params;
        if (!jobId) {
            return resizeBy.status(400).json({
                message: "job id is required",
                success: false
            })
        }

        //check if the user has already applied for the job or not 
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            })
        }

        //check if the job exist
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }
        //Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "job applied successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ cratedAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "No applications",
                success: false
            })
        }
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

//For showing the admin how much applicants apply for the job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error)
    }
}

export const updateStatus=async (req,res)=>{
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(404).json({
                message: "Status is required",
                success: false
            });
        }
        //Find the application by applicant id 
        const application=await Application.findOne({_id:applicationId});
        if (!application) {
            return res.status(404).json({
                message: "Application is not found",
                success: false
            });
        }
        //Update the status
        application.status=status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"status updated succesfully",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}