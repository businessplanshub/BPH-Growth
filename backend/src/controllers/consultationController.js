// //google calendar sync
// import { prisma } from '../config/database.js'
// import { sendCustomerEmail, sendAdminEmail } from '../config/email.js'
// import { 
//   consultationUserTemplate, 
//   consultationAdminTemplate,
//   consultationApprovalTemplate,
//   consultationDenialTemplate
// } from '../utils/emailTemplates.js'

// // Dynamically import Google Calendar service only if enabled
// let googleCalendarService = null

// // Check if Google Calendar is enabled
// const isGoogleCalendarEnabled = () => {
//   return process.env.GOOGLE_CALENDAR_ENABLED === 'true' && 
//          process.env.GOOGLE_CLIENT_EMAIL && 
//          process.env.GOOGLE_PRIVATE_KEY
// }

// // Load Google Calendar service if enabled
// const loadGoogleCalendarService = async () => {
//   if (isGoogleCalendarEnabled() && !googleCalendarService) {
//     try {
//       googleCalendarService = await import('../services/googleCalendarService.js')
//       console.log('✅ Google Calendar service loaded')
//     } catch (error) {
//       console.error('⚠️ Failed to load Google Calendar service:', error.message)
//       googleCalendarService = null
//     }
//   }
//   return googleCalendarService
// }

// // Submit consultation application
// export const submitConsultation = async (req, res) => {
//   try {
//     const {
//       fullName,
//       businessEmail,
//       companyName,
//       industrySector,
//       currentBusinessStage,
//       primaryServiceInterest,
//       targetFundingAmount,
//       businessSummary,
//       slotId
//     } = req.body

//     console.log('📥 Consultation submission:', { 
//       fullName, 
//       businessEmail, 
//       slotId 
//     })

//     let scheduledDate, scheduledTime
//     let googleEventId = null

//     if (isGoogleCalendarEnabled()) {
//       try {
//         // Load Google Calendar service
//         const gcService = await loadGoogleCalendarService()
        
//         if (gcService) {
//           // Fetch slot from Google Calendar to get details
//           const availableSlots = await gcService.fetchAvailableSlotsFromCalendar()
//           const slot = availableSlots.find(s => s.id === slotId)

//           if (!slot) {
//             return res.status(400).json({
//               success: false,
//               message: 'Invalid or unavailable time slot selected. Please refresh and try again.'
//             })
//           }

//           scheduledDate = slot.date
//           scheduledTime = slot.time
//           googleEventId = slotId

//           // Mark slot as booked in Google Calendar
//           await gcService.markSlotAsBooked(slotId, fullName, businessEmail, companyName)
//           console.log('✅ Slot marked as booked in Google Calendar')
//         } else {
//           throw new Error('Google Calendar service not available')
//         }
//       } catch (gcError) {
//         console.error('⚠️ Google Calendar error, falling back to database:', gcError.message)
        
//         // Fallback to database if Google Calendar fails
//         const slot = await prisma.availableSlot.findUnique({
//           where: { id: slotId }
//         })

//         if (!slot) {
//           return res.status(400).json({
//             success: false,
//             message: 'Invalid time slot selected'
//           })
//         }

//         if (slot.isBooked) {
//           return res.status(400).json({
//             success: false,
//             message: 'This time slot has already been booked'
//           })
//         }

//         scheduledDate = slot.date
//         scheduledTime = slot.time

//         await prisma.availableSlot.update({
//           where: { id: slotId },
//           data: { isBooked: true }
//         })
//       }
//     } else {
//       // Original database logic
//       const slot = await prisma.availableSlot.findUnique({
//         where: { id: slotId }
//       })

//       if (!slot) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid time slot selected'
//         })
//       }

//       if (slot.isBooked) {
//         return res.status(400).json({
//           success: false,
//           message: 'This time slot has already been booked'
//         })
//       }

//       scheduledDate = slot.date
//       scheduledTime = slot.time

//       // Mark slot as booked in database
//       await prisma.availableSlot.update({
//         where: { id: slotId },
//         data: { isBooked: true }
//       })
//     }

//     // Create consultation application in database
//     const consultationData = {
//       fullName,
//       businessEmail,
//       companyName,
//       industrySector,
//       currentBusinessStage,
//       primaryServiceInterest,
//       targetFundingAmount: targetFundingAmount || null,
//       businessSummary,
//       scheduledDate,
//       scheduledTime,
//       status: 'pending'
//     }

//     const consultation = await prisma.consultationApplication.create({
//       data: consultationData
//     })

//     console.log('✅ Consultation created:', consultation.id)

//     // Send confirmation emails
//     try {
//       // Send confirmation to CUSTOMER
//       await sendCustomerEmail({
//         to: businessEmail,
//         subject: 'Consultation Application Received - BPH Growth',
//         html: consultationUserTemplate({
//           fullName: consultation.fullName,
//           scheduledDate,
//           scheduledTime,
//           companyName: consultation.companyName
//         })
//       })

//       // Send alert to ADMIN
//       await sendAdminEmail({
//         to: process.env.EMAIL_ADMIN || 'info@bphgrowth.com',
//         subject: '🔔 New Consultation Request',
//         html: consultationAdminTemplate({
//           fullName: consultation.fullName,
//           businessEmail: consultation.businessEmail,
//           companyName: consultation.companyName,
//           industrySector: consultation.industrySector,
//           scheduledDate,
//           scheduledTime,
//           businessSummary: consultation.businessSummary
//         })
//       })

//       console.log('✅ Confirmation emails sent successfully')
//     } catch (emailError) {
//       console.error('⚠️ Email sending failed:', emailError.message)
//       // Don't fail the request if email fails
//     }

//     res.status(201).json({
//       success: true,
//       message: 'Consultation application submitted successfully',
//       data: consultation
//     })
//   } catch (error) {
//     console.error('❌ Error submitting consultation:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to submit consultation application',
//       error: error.message
//     })
//   }
// }

// // Get all consultation applications (admin only)
// export const getAllConsultations = async (req, res) => {
//   try {
//     const consultations = await prisma.consultationApplication.findMany({
//       orderBy: {
//         submittedAt: 'desc'
//       }
//     })

//     res.status(200).json({
//       success: true,
//       data: consultations
//     })
//   } catch (error) {
//     console.error('Error fetching consultations:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch consultations',
//       error: error.message
//     })
//   }
// }

// // Approve consultation
// export const approveConsultation = async (req, res) => {
//   try {
//     const { id } = req.params

//     const consultation = await prisma.consultationApplication.update({
//       where: { id },
//       data: { status: 'approved' }
//     })

//     console.log('✅ Consultation approved:', consultation.id)

//     // Send approval email to CUSTOMER
//     try {
//       await sendCustomerEmail({
//         to: consultation.businessEmail,
//         subject: 'Consultation Approved - BPH Growth',
//         html: consultationApprovalTemplate({
//           fullName: consultation.fullName,
//           scheduledDate: consultation.scheduledDate,
//           scheduledTime: consultation.scheduledTime,
//           companyName: consultation.companyName
//         })
//       })

//       console.log('✅ Approval email sent to:', consultation.businessEmail)
//     } catch (emailError) {
//       console.error('⚠️ Approval email failed:', emailError.message)
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Consultation approved',
//       data: consultation
//     })
//   } catch (error) {
//     console.error('Error approving consultation:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to approve consultation',
//       error: error.message
//     })
//   }
// }

// // Deny consultation
// export const denyConsultation = async (req, res) => {
//   try {
//     const { id } = req.params

//     const consultation = await prisma.consultationApplication.update({
//       where: { id },
//       data: { status: 'denied' }
//     })

//     console.log('❌ Consultation denied:', consultation.id)

//     // Send denial email to CUSTOMER
//     try {
//       await sendCustomerEmail({
//         to: consultation.businessEmail,
//         subject: 'Consultation Status Update - BPH Growth',
//         html: consultationDenialTemplate({
//           fullName: consultation.fullName,
//           companyName: consultation.companyName
//         })
//       })

//       console.log('✅ Denial email sent to:', consultation.businessEmail)
//     } catch (emailError) {
//       console.error('⚠️ Denial email failed:', emailError.message)
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Consultation denied',
//       data: consultation
//     })
//   } catch (error) {
//     console.error('Error denying consultation:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to deny consultation',
//       error: error.message
//     })
//   }
// }



import { prisma } from '../config/database.js'
import { sendCustomerEmail, sendAdminEmail } from '../config/email.js'
import { 
  consultationUserTemplate, 
  consultationAdminTemplate,
  consultationApprovalTemplate,
  consultationDenialTemplate
} from '../utils/emailTemplates.js'

// Dynamically import Google Calendar service only if enabled
let googleCalendarService = null

// Check if Google Calendar is enabled
const isGoogleCalendarEnabled = () => {
  return process.env.GOOGLE_CALENDAR_ENABLED === 'true' && 
         process.env.GOOGLE_CLIENT_EMAIL && 
         process.env.GOOGLE_PRIVATE_KEY
}

// Load Google Calendar service if enabled
const loadGoogleCalendarService = async () => {
  if (isGoogleCalendarEnabled() && !googleCalendarService) {
    try {
      googleCalendarService = await import('../services/googleCalendarService.js')
      console.log('✅ Google Calendar service loaded')
    } catch (error) {
      console.error('⚠️ Failed to load Google Calendar service:', error.message)
      googleCalendarService = null
    }
  }
  return googleCalendarService
}

// Submit consultation application - OPTIMIZED VERSION
export const submitConsultation = async (req, res) => {
  try {
    const {
      fullName,
      businessEmail,
      companyName,
      industrySector,
      currentBusinessStage,
      primaryServiceInterest,
      targetFundingAmount,
      businessSummary,
      slotId,
      // These come from the frontend now (passed along with the slot selection)
      slotDate,
      slotTime
    } = req.body

    console.log('📥 Consultation submission:', { 
      fullName, 
      businessEmail, 
      slotId,
      slotDate,
      slotTime
    })

    let scheduledDate, scheduledTime

    if (isGoogleCalendarEnabled()) {
      try {
        const gcService = await loadGoogleCalendarService()
        
        if (gcService) {
          // OPTIMIZATION: Use the date/time passed from frontend
          // Instead of fetching all slots again, trust the data from the form
          // The slot was validated when it was displayed to the user
          
          if (slotDate && slotTime) {
            // Use data from frontend
            scheduledDate = new Date(slotDate)
            scheduledTime = slotTime
          } else {
            // Fallback: Fetch from Google Calendar (slower)
            const availableSlots = await gcService.fetchAvailableSlotsFromCalendar()
            const slot = availableSlots.find(s => s.id === slotId)

            if (!slot) {
              return res.status(400).json({
                success: false,
                message: 'Invalid or unavailable time slot selected. Please refresh and try again.'
              })
            }

            scheduledDate = slot.date
            scheduledTime = slot.time
          }

          // Mark slot as booked in Google Calendar (runs in parallel with DB save)
          // Don't await - let it run in background
          gcService.markSlotAsBooked(slotId, fullName, businessEmail, companyName)
            .then(() => console.log('✅ Slot marked as booked in Google Calendar'))
            .catch(err => console.error('⚠️ Failed to mark slot as booked:', err.message))

        } else {
          throw new Error('Google Calendar service not available')
        }
      } catch (gcError) {
        console.error('⚠️ Google Calendar error:', gcError.message)
        
        // If we have slot data from frontend, still proceed
        if (slotDate && slotTime) {
          scheduledDate = new Date(slotDate)
          scheduledTime = slotTime
        } else {
          return res.status(400).json({
            success: false,
            message: 'Failed to process booking. Please try again.'
          })
        }
      }
    } else {
      // Original database logic
      const slot = await prisma.availableSlot.findUnique({
        where: { id: slotId }
      })

      if (!slot) {
        return res.status(400).json({
          success: false,
          message: 'Invalid time slot selected'
        })
      }

      if (slot.isBooked) {
        return res.status(400).json({
          success: false,
          message: 'This time slot has already been booked'
        })
      }

      scheduledDate = slot.date
      scheduledTime = slot.time

      // Mark slot as booked in database
      await prisma.availableSlot.update({
        where: { id: slotId },
        data: { isBooked: true }
      })
    }

    // Create consultation application in database
    const consultation = await prisma.consultationApplication.create({
      data: {
        fullName,
        businessEmail,
        companyName,
        industrySector,
        currentBusinessStage,
        primaryServiceInterest,
        targetFundingAmount: targetFundingAmount || null,
        businessSummary,
        scheduledDate,
        scheduledTime,
        status: 'pending'
      }
    })

    console.log('✅ Consultation created:', consultation.id)

    // Send confirmation emails in background (don't wait)
    sendEmailsInBackground(consultation, businessEmail, scheduledDate, scheduledTime)

    // Return success immediately
    res.status(201).json({
      success: true,
      message: 'Consultation application submitted successfully',
      data: consultation
    })
  } catch (error) {
    console.error('❌ Error submitting consultation:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit consultation application',
      error: error.message
    })
  }
}

// Send emails in background without blocking the response
const sendEmailsInBackground = async (consultation, businessEmail, scheduledDate, scheduledTime) => {
  try {
    // Send both emails in parallel
    await Promise.all([
      // Customer email
      sendCustomerEmail({
        to: businessEmail,
        subject: 'Consultation Application Received - BPH Growth',
        html: consultationUserTemplate({
          fullName: consultation.fullName,
          scheduledDate,
          scheduledTime,
          companyName: consultation.companyName
        })
      }),
      // Admin email
      sendAdminEmail({
        to: process.env.EMAIL_ADMIN || 'info@bphgrowth.com',
        subject: '🔔 New Consultation Request',
        html: consultationAdminTemplate({
          fullName: consultation.fullName,
          businessEmail: consultation.businessEmail,
          companyName: consultation.companyName,
          industrySector: consultation.industrySector,
          scheduledDate,
          scheduledTime,
          businessSummary: consultation.businessSummary
        })
      })
    ])
    console.log('✅ Confirmation emails sent successfully')
  } catch (emailError) {
    console.error('⚠️ Email sending failed:', emailError.message)
  }
}

// Get all consultation applications (admin only)
export const getAllConsultations = async (req, res) => {
  try {
    const consultations = await prisma.consultationApplication.findMany({
      orderBy: {
        submittedAt: 'desc'
      }
    })

    res.status(200).json({
      success: true,
      data: consultations
    })
  } catch (error) {
    console.error('Error fetching consultations:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultations',
      error: error.message
    })
  }
}

// Approve consultation
export const approveConsultation = async (req, res) => {
  try {
    const { id } = req.params

    const consultation = await prisma.consultationApplication.update({
      where: { id },
      data: { status: 'approved' }
    })

    console.log('✅ Consultation approved:', consultation.id)

    // Send approval email in background
    sendCustomerEmail({
      to: consultation.businessEmail,
      subject: 'Consultation Approved - BPH Growth',
      html: consultationApprovalTemplate({
        fullName: consultation.fullName,
        scheduledDate: consultation.scheduledDate,
        scheduledTime: consultation.scheduledTime,
        companyName: consultation.companyName
      })
    })
      .then(() => console.log('✅ Approval email sent to:', consultation.businessEmail))
      .catch(err => console.error('⚠️ Approval email failed:', err.message))

    res.status(200).json({
      success: true,
      message: 'Consultation approved',
      data: consultation
    })
  } catch (error) {
    console.error('Error approving consultation:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to approve consultation',
      error: error.message
    })
  }
}

// Deny consultation
export const denyConsultation = async (req, res) => {
  try {
    const { id } = req.params

    const consultation = await prisma.consultationApplication.update({
      where: { id },
      data: { status: 'denied' }
    })

    console.log('❌ Consultation denied:', consultation.id)

    // Send denial email in background
    sendCustomerEmail({
      to: consultation.businessEmail,
      subject: 'Consultation Status Update - BPH Growth',
      html: consultationDenialTemplate({
        fullName: consultation.fullName,
        companyName: consultation.companyName
      })
    })
      .then(() => console.log('✅ Denial email sent to:', consultation.businessEmail))
      .catch(err => console.error('⚠️ Denial email failed:', err.message))

    res.status(200).json({
      success: true,
      message: 'Consultation denied',
      data: consultation
    })
  } catch (error) {
    console.error('Error denying consultation:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to deny consultation',
      error: error.message
    })
  }
}