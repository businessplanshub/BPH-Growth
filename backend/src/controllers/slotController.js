// import { prisma } from '../config/database.js'

// // Create a single time slot
// export const createSlot = async (req, res) => {
//   try {
//     const { date, time } = req.body

//     // Validate date format
//     const slotDate = new Date(date)
//     if (isNaN(slotDate.getTime())) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid date format'
//       })
//     }

//     // Check if slot already exists
//     const existingSlot = await prisma.availableSlot.findFirst({
//       where: {
//         date: slotDate,
//         time: time
//       }
//     })

//     if (existingSlot) {
//       return res.status(400).json({
//         success: false,
//         message: 'This time slot already exists'
//       })
//     }

//     // Create slot
//     const slot = await prisma.availableSlot.create({
//       data: {
//         date: slotDate,
//         time,
//         isBooked: false
//       }
//     })

//     console.log('✅ Slot created:', slot.id)

//     res.status(201).json({
//       success: true,
//       message: 'Time slot created successfully',
//       data: slot
//     })
//   } catch (error) {
//     console.error('Error creating slot:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create time slot',
//       error: error.message
//     })
//   }
// }

// // Create multiple time slots
// export const createMultipleSlots = async (req, res) => {
//   try {
//     const { dates, times } = req.body

//     console.log('📥 Received request:', { dates, times })

//     if (!dates || !Array.isArray(dates) || dates.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Dates array is required and must not be empty'
//       })
//     }

//     if (!times || !Array.isArray(times) || times.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Times array is required and must not be empty'
//       })
//     }

//     const slotsCreated = []

//     // Generate all combinations of dates and times
//     for (const dateStr of dates) {
//       const slotDate = new Date(dateStr)
      
//       if (isNaN(slotDate.getTime())) {
//         return res.status(400).json({
//           success: false,
//           message: `Invalid date format: ${dateStr}`
//         })
//       }

//       for (const time of times) {
//         // Check if slot already exists
//         const existingSlot = await prisma.availableSlot.findFirst({
//           where: {
//             date: slotDate,
//             time: time
//           }
//         })

//         if (!existingSlot) {
//           // Create individual slot (MongoDB doesn't support createMany with skipDuplicates)
//           const slot = await prisma.availableSlot.create({
//             data: {
//               date: slotDate,
//               time,
//               isBooked: false
//             }
//           })
//           slotsCreated.push(slot)
//         }
//       }
//     }

//     if (slotsCreated.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'All specified time slots already exist'
//       })
//     }

//     console.log(`✅ Created ${slotsCreated.length} slots`)

//     res.status(201).json({
//       success: true,
//       message: `${slotsCreated.length} time slot(s) created successfully`,
//       data: {
//         count: slotsCreated.length,
//         slots: slotsCreated
//       }
//     })
//   } catch (error) {
//     console.error('Error creating multiple slots:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create time slots',
//       error: error.message
//     })
//   }
// }

// // Get all slots (admin only)
// export const getAllSlots = async (req, res) => {
//   try {
//     const slots = await prisma.availableSlot.findMany({
//       orderBy: [
//         { date: 'asc' },
//         { time: 'asc' }
//       ]
//     })

//     console.log(`📊 Total slots in database: ${slots.length}`)

//     res.status(200).json({
//       success: true,
//       data: slots
//     })
//   } catch (error) {
//     console.error('Error fetching all slots:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch time slots',
//       error: error.message
//     })
//   }
// }

// // Get available (unbooked) slots (public)
// export const getAvailableSlots = async (req, res) => {
//   try {
//     console.log('🔍 Getting all unbooked slots')
    
//     const slots = await prisma.availableSlot.findMany({
//       where: {
//         isBooked: false
//         // Date filter removed - we'll add it back with proper logic later
//       },
//       orderBy: [
//         { date: 'asc' },
//         { time: 'asc' }
//       ]
//     })

//     console.log(`📤 Found ${slots.length} slots`)
    
//     if (slots.length > 0) {
//       console.log(`📤 First slot:`, {
//         id: slots[0].id,
//         date: slots[0].date,
//         time: slots[0].time
//       })
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         slots,
//         count: slots.length
//       }
//     })
//   } catch (error) {
//     console.error('Error fetching available slots:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch available time slots',
//       error: error.message
//     })
//   }
// }

// // Delete a time slot
// export const deleteSlot = async (req, res) => {
//   try {
//     const { id } = req.params

//     // Check if slot exists
//     const slot = await prisma.availableSlot.findUnique({
//       where: { id }
//     })

//     if (!slot) {
//       return res.status(404).json({
//         success: false,
//         message: 'Time slot not found'
//       })
//     }

//     // Don't allow deleting booked slots
//     if (slot.isBooked) {
//       return res.status(400).json({
//         success: false,
//         message: 'Cannot delete a booked time slot'
//       })
//     }

//     // Delete slot
//     await prisma.availableSlot.delete({
//       where: { id }
//     })

//     console.log(`🗑️ Deleted slot: ${id}`)

//     res.status(200).json({
//       success: true,
//       message: 'Time slot deleted successfully'
//     })
//   } catch (error) {
//     console.error('Error deleting slot:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete time slot',
//       error: error.message
//     })
//   }
// }



import { prisma } from '../config/database.js'
import {
  fetchAvailableSlotsFromCalendar,
  fetchAllSlotsFromCalendar,
  markSlotAsBooked,
  markSlotAsAvailable,
  createSlotInCalendar,
  deleteSlotFromCalendar,
  testCalendarConnection
} from '../services/googleCalendarService.js'

// Check if Google Calendar is enabled
const isGoogleCalendarEnabled = () => {
  return process.env.GOOGLE_CALENDAR_ENABLED === 'true' && 
         process.env.GOOGLE_CLIENT_EMAIL && 
         process.env.GOOGLE_PRIVATE_KEY
}

/**
 * Get available (unbooked) slots
 * Fetches from Google Calendar if enabled, otherwise from database
 */
export const getAvailableSlots = async (req, res) => {
  try {
    console.log('🔍 Getting available slots...')
    
    let slots = []

    if (isGoogleCalendarEnabled()) {
      // Fetch from Google Calendar
      console.log('📅 Fetching from Google Calendar...')
      slots = await fetchAvailableSlotsFromCalendar()
    } else {
      // Fallback to database
      console.log('💾 Fetching from database...')
      slots = await prisma.availableSlot.findMany({
        where: {
          isBooked: false,
          date: {
            gte: new Date()
          }
        },
        orderBy: [
          { date: 'asc' },
          { time: 'asc' }
        ]
      })
    }

    console.log(`📤 Found ${slots.length} available slots`)

    res.status(200).json({
      success: true,
      data: {
        slots,
        count: slots.length,
        source: isGoogleCalendarEnabled() ? 'google_calendar' : 'database'
      }
    })
  } catch (error) {
    console.error('Error fetching available slots:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available time slots',
      error: error.message
    })
  }
}

/**
 * Get all slots (admin only)
 * Fetches from Google Calendar if enabled, otherwise from database
 */
export const getAllSlots = async (req, res) => {
  try {
    let slots = []

    if (isGoogleCalendarEnabled()) {
      slots = await fetchAllSlotsFromCalendar()
    } else {
      slots = await prisma.availableSlot.findMany({
        orderBy: [
          { date: 'asc' },
          { time: 'asc' }
        ]
      })
    }

    console.log(`📊 Total slots: ${slots.length}`)

    res.status(200).json({
      success: true,
      data: slots,
      source: isGoogleCalendarEnabled() ? 'google_calendar' : 'database'
    })
  } catch (error) {
    console.error('Error fetching all slots:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch time slots',
      error: error.message
    })
  }
}

/**
 * Book a slot
 * Updates Google Calendar if enabled, otherwise updates database
 */
export const bookSlot = async (slotId, customerName, customerEmail, companyName) => {
  try {
    if (isGoogleCalendarEnabled()) {
      // Update in Google Calendar
      await markSlotAsBooked(slotId, customerName, customerEmail, companyName)
      console.log(`✅ Slot booked in Google Calendar: ${slotId}`)
    } else {
      // Update in database
      await prisma.availableSlot.update({
        where: { id: slotId },
        data: { isBooked: true }
      })
      console.log(`✅ Slot booked in database: ${slotId}`)
    }
    
    return true
  } catch (error) {
    console.error('Error booking slot:', error)
    throw error
  }
}

/**
 * Unbook a slot (for cancellations)
 */
export const unbookSlot = async (slotId) => {
  try {
    if (isGoogleCalendarEnabled()) {
      await markSlotAsAvailable(slotId)
      console.log(`✅ Slot unbooked in Google Calendar: ${slotId}`)
    } else {
      await prisma.availableSlot.update({
        where: { id: slotId },
        data: { isBooked: false }
      })
      console.log(`✅ Slot unbooked in database: ${slotId}`)
    }
    
    return true
  } catch (error) {
    console.error('Error unbooking slot:', error)
    throw error
  }
}

/**
 * Create a single time slot
 * Creates in Google Calendar if enabled, otherwise in database
 */
export const createSlot = async (req, res) => {
  try {
    const { date, time } = req.body

    // Validate date format
    const slotDate = new Date(date)
    if (isNaN(slotDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      })
    }

    let slot

    if (isGoogleCalendarEnabled()) {
      // Create in Google Calendar
      slot = await createSlotInCalendar(date, time)
      slot = {
        id: slot.id,
        googleEventId: slot.id,
        date: slotDate,
        time,
        isBooked: false
      }
    } else {
      // Check if slot already exists in database
      const existingSlot = await prisma.availableSlot.findFirst({
        where: {
          date: slotDate,
          time: time
        }
      })

      if (existingSlot) {
        return res.status(400).json({
          success: false,
          message: 'This time slot already exists'
        })
      }

      // Create in database
      slot = await prisma.availableSlot.create({
        data: {
          date: slotDate,
          time,
          isBooked: false
        }
      })
    }

    console.log('✅ Slot created:', slot.id)

    res.status(201).json({
      success: true,
      message: 'Time slot created successfully',
      data: slot
    })
  } catch (error) {
    console.error('Error creating slot:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create time slot',
      error: error.message
    })
  }
}

/**
 * Create multiple time slots
 */
export const createMultipleSlots = async (req, res) => {
  try {
    const { dates, times } = req.body

    if (!dates || !Array.isArray(dates) || dates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Dates array is required and must not be empty'
      })
    }

    if (!times || !Array.isArray(times) || times.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Times array is required and must not be empty'
      })
    }

    const slotsCreated = []

    for (const dateStr of dates) {
      const slotDate = new Date(dateStr)
      
      if (isNaN(slotDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: `Invalid date format: ${dateStr}`
        })
      }

      for (const time of times) {
        try {
          if (isGoogleCalendarEnabled()) {
            const slot = await createSlotInCalendar(dateStr, time)
            slotsCreated.push({
              id: slot.id,
              date: slotDate,
              time,
              isBooked: false
            })
          } else {
            // Check if exists
            const existingSlot = await prisma.availableSlot.findFirst({
              where: { date: slotDate, time }
            })

            if (!existingSlot) {
              const slot = await prisma.availableSlot.create({
                data: { date: slotDate, time, isBooked: false }
              })
              slotsCreated.push(slot)
            }
          }
        } catch (err) {
          console.error(`Error creating slot for ${dateStr} at ${time}:`, err.message)
        }
      }
    }

    if (slotsCreated.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No slots were created. They may already exist.'
      })
    }

    console.log(`✅ Created ${slotsCreated.length} slots`)

    res.status(201).json({
      success: true,
      message: `${slotsCreated.length} time slot(s) created successfully`,
      data: {
        count: slotsCreated.length,
        slots: slotsCreated
      }
    })
  } catch (error) {
    console.error('Error creating multiple slots:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create time slots',
      error: error.message
    })
  }
}

/**
 * Delete a time slot
 */
export const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params

    if (isGoogleCalendarEnabled()) {
      await deleteSlotFromCalendar(id)
    } else {
      const slot = await prisma.availableSlot.findUnique({
        where: { id }
      })

      if (!slot) {
        return res.status(404).json({
          success: false,
          message: 'Time slot not found'
        })
      }

      if (slot.isBooked) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete a booked time slot'
        })
      }

      await prisma.availableSlot.delete({
        where: { id }
      })
    }

    console.log(`🗑️ Deleted slot: ${id}`)

    res.status(200).json({
      success: true,
      message: 'Time slot deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting slot:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete time slot',
      error: error.message
    })
  }
}

/**
 * Test Google Calendar connection
 */
export const testConnection = async (req, res) => {
  try {
    if (!isGoogleCalendarEnabled()) {
      return res.status(200).json({
        success: true,
        message: 'Google Calendar is not enabled. Using database for slots.',
        googleCalendarEnabled: false
      })
    }

    const result = await testCalendarConnection()

    res.status(200).json({
      success: result.success,
      message: result.success 
        ? `Connected to calendar: ${result.calendarName}` 
        : `Connection failed: ${result.error}`,
      googleCalendarEnabled: true,
      data: result
    })
  } catch (error) {
    console.error('Error testing connection:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to test Google Calendar connection',
      error: error.message
    })
  }
}

/**
 * Sync status - check if Google Calendar is enabled
 */
export const getSyncStatus = async (req, res) => {
  try {
    const enabled = isGoogleCalendarEnabled()
    
    let connectionStatus = null
    if (enabled) {
      connectionStatus = await testCalendarConnection()
    }

    res.status(200).json({
      success: true,
      data: {
        googleCalendarEnabled: enabled,
        connectionStatus,
        message: enabled 
          ? 'Slots are synced from Google Calendar' 
          : 'Slots are managed in database'
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get sync status',
      error: error.message
    })
  }
}

// Export bookSlot for use in consultation controller
export { bookSlot as bookSlotService }