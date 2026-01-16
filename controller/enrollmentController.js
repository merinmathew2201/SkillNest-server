const enrollments = require('../model/enrollmentModel')
const users = require('../model/userModel')
const courses = require("../model/courseModel")
const stripe = require('stripe')(process.env.stripeSecret)

// get all students enrolled in the course
exports.getCourseStudentsController = async (req, res) => {
  try {
    const { courseId } = req.params

    const students = await enrollments.find({ courseId }).populate("studentId", "username email").sort({ createdAt: -1 })

    res.status(200).json(students)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// get dashboard stats
exports.getEducatorDashboardStats = async (req, res) => {
    try {
        const educatorMail = req.payload

        // Total courses created by this educator
        const totalCourses = await courses.countDocuments({ educatorMail });

        // Approved courses
        const approvedCourses = await courses.countDocuments({ educatorMail, courseApproved: true });

        // Pending approval courses
        const pendingCourses = await courses.countDocuments({ educatorMail, courseApproved: false });

        // Total students enrolled in all courses
        const coursesList = await courses.find({ educatorMail }, "_id");
        const courseIds = coursesList.map(c => c._id);

        const totalStudents = await enrollments.countDocuments({ courseId: { $in: courseIds } });

        res.status(200).json({totalCourses,approvedCourses,pendingCourses,totalStudents})
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

//course enroll - payment
exports.coursePaymentController = async(req,res)=>{
  console.log("Inside coursePaymentController")
  try {
    const { courseId } = req.params
    const courseDetails = await courses.findById({_id:courseId})
    
    const line_items = [{
            price_data:{
                currency:'usd',
                product_data:{
                    name:courseDetails.title,
                    description:courseDetails.shortDescription,
                    metadata:{
                        title:courseDetails.title,price: courseDetails.price,shortDescription:courseDetails.shortDescription
                    }
                },
                unit_amount:Math.round(courseDetails.price*100)
            },
            quantity:1
        }]
    const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items,
            mode: 'payment',
            success_url: `http://localhost:5173/payment-success?courseId=${courseId}`,
            cancel_url: 'http://localhost:5173/payment-error'
            });
        console.log(session);
        res.status(200).json({checkOutURL:session.url})
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// after payment success
exports.enrollCourseController = async (req, res) => {
  console.log("Inside enrollCourseController")
  try {
    const { courseId } = req.body
    const studentMail = req.payload
    const student = await users.findOne({ email: studentMail })
    if (student) {
      const alreadyEnrolled = await enrollments.findOne({courseId,studentId: student._id})

      if (alreadyEnrolled) {
       res.status(200).json("Already enrolled")
      }else{
        const newEnrollment = new enrollments({courseId,studentId: student._id})
        await newEnrollment.save()
        res.status(201).json(newEnrollment)
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

exports.getEnrolledCoursesController = async (req, res) => {
  try {
    const studentMail = req.payload; 
    const student = await users.findOne({ email: studentMail });
    if(student){
      const enrollmentsList = await enrollments.find({ studentId: student._id }).populate("courseId");
      const coursesList = enrollmentsList.map(enroll => enroll.courseId);

      res.status(200).json(coursesList);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error );
  }
}



