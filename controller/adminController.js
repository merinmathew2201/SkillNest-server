const courses = require('../model/courseModel')
const users = require('../model/userModel')

exports.getAdminDashboardStatsController = async (req,res)=>{
    console.log("Inside getAdminDashboardStatsController ");
    try {
        const totalStudents = await users.countDocuments({role:"student"})
        const totalEducators = await users.countDocuments({role:"educator"})
        const totalCourses = await courses.countDocuments()
        const totalPendingUsers = await users.countDocuments({role:"educator",approvalStatus:false})
        const totalPendingCourses = await courses.countDocuments({courseApproved:false})
        const totalPendingApprovals = totalPendingUsers+totalPendingCourses

        res.status(200).json({totalStudents,totalEducators,totalCourses,totalPendingApprovals})
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
        
        
    }
    
}