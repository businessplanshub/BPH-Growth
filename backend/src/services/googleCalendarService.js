// import { google } from 'googleapis'

// // Initialize Google Calendar API
// const initializeCalendar = () => {
//   // Using Service Account authentication
//   const auth = new google.auth.GoogleAuth({
//     credentials: {
//       type: 'service_account',
//       project_id: process.env.GOOGLE_PROJECT_ID,
//       private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
//       private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//       client_email: process.env.GOOGLE_CLIENT_EMAIL,
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//       token_uri: 'https://oauth2.googleapis.com/token',
//     },
//     scopes: ['https://www.googleapis.com/auth/calendar'],
//   })

//   return google.calendar({ version: 'v3', auth })
// }

// // Get the calendar ID from environment
// const getCalendarId = () => {
//   return process.env.GOOGLE_CALENDAR_ID || 'primary'
// }

// /**
//  * Fetch available slots from Google Calendar
//  * Looks for events with title starting with "[AVAILABLE]"
//  */
// export const fetchAvailableSlotsFromCalendar = async () => {
//   try {
//     const calendar = initializeCalendar()
//     const calendarId = getCalendarId()

//     // Get events from now to 60 days in the future
//     const now = new Date()
//     const futureDate = new Date()
//     futureDate.setDate(futureDate.getDate() + 60)

//     const response = await calendar.events.list({
//       calendarId,
//       timeMin: now.toISOString(),
//       timeMax: futureDate.toISOString(),
//       singleEvents: true,
//       orderBy: 'startTime',
//       q: '[AVAILABLE]', // Search for events with [AVAILABLE] in title
//     })

//     const events = response.data.items || []

//     // Filter and transform events
//     const availableSlots = events
//       .filter(event => event.summary && event.summary.startsWith('[AVAILABLE]'))
//       .map(event => {
//         const startDateTime = new Date(event.start.dateTime || event.start.date)
        
//         return {
//           id: event.id,
//           googleEventId: event.id,
//           date: startDateTime,
//           time: startDateTime.toLocaleTimeString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//             timeZone: process.env.TIMEZONE || 'Africa/Lagos'
//           }),
//           title: event.summary.replace('[AVAILABLE]', '').trim(),
//           isBooked: false
//         }
//       })

//     console.log(`📅 Fetched ${availableSlots.length} available slots from Google Calendar`)
//     return availableSlots

//   } catch (error) {
//     console.error('❌ Error fetching from Google Calendar:', error.message)
//     throw error
//   }
// }

// /**
//  * Fetch all slots (available and booked) from Google Calendar
//  * For admin view
//  */
// export const fetchAllSlotsFromCalendar = async () => {
//   try {
//     const calendar = initializeCalendar()
//     const calendarId = getCalendarId()

//     // Get events from 30 days ago to 60 days in the future
//     const pastDate = new Date()
//     pastDate.setDate(pastDate.getDate() - 30)
//     const futureDate = new Date()
//     futureDate.setDate(futureDate.getDate() + 60)

//     const response = await calendar.events.list({
//       calendarId,
//       timeMin: pastDate.toISOString(),
//       timeMax: futureDate.toISOString(),
//       singleEvents: true,
//       orderBy: 'startTime',
//     })

//     const events = response.data.items || []

//     // Filter for consultation-related events
//     const slots = events
//       .filter(event => 
//         event.summary && 
//         (event.summary.startsWith('[AVAILABLE]') || event.summary.startsWith('[BOOKED]'))
//       )
//       .map(event => {
//         const startDateTime = new Date(event.start.dateTime || event.start.date)
//         const isBooked = event.summary.startsWith('[BOOKED]')
        
//         return {
//           id: event.id,
//           googleEventId: event.id,
//           date: startDateTime,
//           time: startDateTime.toLocaleTimeString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//             timeZone: process.env.TIMEZONE || 'Africa/Lagos'
//           }),
//           title: event.summary.replace('[AVAILABLE]', '').replace('[BOOKED]', '').trim(),
//           description: event.description || '',
//           isBooked
//         }
//       })

//     console.log(`📅 Fetched ${slots.length} total slots from Google Calendar`)
//     return slots

//   } catch (error) {
//     console.error('❌ Error fetching all slots from Google Calendar:', error.message)
//     throw error
//   }
// }

// /**
//  * Mark a slot as booked in Google Calendar
//  * Updates the event title from [AVAILABLE] to [BOOKED]
//  */
// export const markSlotAsBooked = async (googleEventId, customerName, customerEmail, companyName) => {
//   try {
//     const calendar = initializeCalendar()
//     const calendarId = getCalendarId()

//     // First, get the existing event
//     const event = await calendar.events.get({
//       calendarId,
//       eventId: googleEventId,
//     })

//     // Update the event
//     const updatedEvent = {
//       ...event.data,
//       summary: `[BOOKED] Consultation with ${customerName}`,
//       description: `
// Consultation Booking Details:
// ----------------------------
// Customer: ${customerName}
// Email: ${customerEmail}
// Company: ${companyName}

// Original slot: ${event.data.summary}
// Booked at: ${new Date().toISOString()}
//       `.trim(),
//       colorId: '11', // Red color to indicate booked
//     }

//     const response = await calendar.events.update({
//       calendarId,
//       eventId: googleEventId,
//       resource: updatedEvent,
//     })

//     console.log(`✅ Slot marked as booked in Google Calendar: ${googleEventId}`)
//     return response.data

//   } catch (error) {
//     console.error('❌ Error marking slot as booked:', error.message)
//     throw error
//   }
// }

// /**
//  * Mark a slot as available again (for cancellations)
//  */
// export const markSlotAsAvailable = async (googleEventId, originalTitle = 'Consultation Slot') => {
//   try {
//     const calendar = initializeCalendar()
//     const calendarId = getCalendarId()

//     // Get the existing event
//     const event = await calendar.events.get({
//       calendarId,
//       eventId: googleEventId,
//     })

//     // Update the event back to available
//     const updatedEvent = {
//       ...event.data,
//       summary: `[AVAILABLE] ${originalTitle}`,
//       description: 'Available consultation slot',
//       colorId: '10', // Green color to indicate available
//     }

//     const response = await calendar.events.update({
//       calendarId,
//       eventId: googleEventId,
//       resource: updatedEvent,
//     })

//     console.log(`✅ Slot marked as available in Google Calendar: ${googleEventId}`)
//     return response.data

//   } catch (error) {
//     console.error('❌ Error marking slot as available:', error.message)
//     throw error
//   }
// }

// /**
//  * Create a new available slot in Google Calendar
//  * (Optional - for admin to create slots from the website)
//  */
// export const createSlotInCalendar = async (date, time, durationMinutes = 30) => {
//   try {
//     const calendar = initializeCalendar()
//     const calendarId = getCalendarId()

//     // Parse the date and time
//     const [hours, minutes] = parseTime(time)
//     const startDateTime = new Date(date)
//     startDateTime.setHours(hours, minutes, 0, 0)

//     const endDateTime = new Date(startDateTime)
//     endDateTime.setMinutes(endDateTime.getMinutes() + durationMinutes)

//     const event = {
//       summary: '[AVAILABLE] Consultation Slot',
//       description: 'Available consultation slot - created from BPH Growth website',
//       start: {
//         dateTime: startDateTime.toISOString(),
//         timeZone: process.env.TIMEZONE || 'Africa/Lagos',
//       },
//       end: {
//         dateTime: endDateTime.toISOString(),
//         timeZone: process.env.TIMEZONE || 'Africa/Lagos',
//       },
//       colorId: '10', // Green color
//     }

//     const response = await calendar.events.insert({
//       calendarId,
//       resource: event,
//     })

//     console.log(`✅ Slot created in Google Calendar: ${response.data.id}`)
//     return response.data

//   } catch (error) {
//     console.error('❌ Error creating slot in Google Calendar:', error.message)
//     throw error
//   }
// }

// /**
//  * Delete a slot from Google Calendar
//  */
// export const deleteSlotFromCalendar = async (googleEventId) => {
//   try {
//     const calendar = initializeCalendar()
//     const calendarId = getCalendarId()

//     await calendar.events.delete({
//       calendarId,
//       eventId: googleEventId,
//     })

//     console.log(`🗑️ Slot deleted from Google Calendar: ${googleEventId}`)
//     return true

//   } catch (error) {
//     console.error('❌ Error deleting slot from Google Calendar:', error.message)
//     throw error
//   }
// }

// /**
//  * Helper function to parse time string like "10:00 AM" to hours and minutes
//  */
// const parseTime = (timeString) => {
//   const match = timeString.match(/(\d+):(\d+)\s*(AM|PM)/i)
//   if (!match) {
//     throw new Error(`Invalid time format: ${timeString}`)
//   }

//   let hours = parseInt(match[1])
//   const minutes = parseInt(match[2])
//   const period = match[3].toUpperCase()

//   if (period === 'PM' && hours !== 12) {
//     hours += 12
//   } else if (period === 'AM' && hours === 12) {
//     hours = 0
//   }

//   return [hours, minutes]
// }

// /**
//  * Test the Google Calendar connection
//  */
// export const testCalendarConnection = async () => {
//   try {
//     const calendar = initializeCalendar()
//     const calendarId = getCalendarId()

//     const response = await calendar.calendarList.get({
//       calendarId,
//     })

//     console.log('✅ Google Calendar connection successful!')
//     console.log(`📅 Calendar: ${response.data.summary}`)
//     return {
//       success: true,
//       calendarName: response.data.summary,
//       calendarId: response.data.id
//     }

//   } catch (error) {
//     console.error('❌ Google Calendar connection failed:', error.message)
//     return {
//       success: false,
//       error: error.message
//     }
//   }
// }


import { google } from 'googleapis'

// ===========================================
// CACHE CONFIGURATION
// ===========================================
let slotsCache = {
  available: null,
  all: null,
  lastFetchedAvailable: null,
  lastFetchedAll: null
}

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000

// How far in the future to fetch slots (in days)
const FUTURE_DAYS = 60  // 1 year of slots

// How far in the past to fetch for admin view (in days)
const PAST_DAYS = 30

// ===========================================
// GOOGLE CALENDAR INITIALIZATION
// ===========================================
const initializeCalendar = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  return google.calendar({ version: 'v3', auth })
}

const getCalendarId = () => {
  return process.env.GOOGLE_CALENDAR_ID || 'primary'
}

// ===========================================
// CACHE HELPERS
// ===========================================
const isCacheValid = (lastFetched) => {
  if (!lastFetched) return false
  return (Date.now() - lastFetched) < CACHE_DURATION
}

/**
 * Clear the cache (call this after booking a slot)
 */
export const clearCache = () => {
  slotsCache = {
    available: null,
    all: null,
    lastFetchedAvailable: null,
    lastFetchedAll: null
  }
  console.log('🗑️ Slots cache cleared')
}

// ===========================================
// FETCH AVAILABLE SLOTS (PUBLIC)
// ===========================================
/**
 * Fetch available slots from Google Calendar
 * Uses cache to avoid repeated API calls
 */
export const fetchAvailableSlotsFromCalendar = async (forceRefresh = false) => {
  try {
    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && isCacheValid(slotsCache.lastFetchedAvailable) && slotsCache.available) {
      console.log('📦 Returning cached available slots')
      return slotsCache.available
    }

    console.log('📅 Fetching fresh slots from Google Calendar...')
    const calendar = initializeCalendar()
    const calendarId = getCalendarId()

    const now = new Date()
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + FUTURE_DAYS)

    const response = await calendar.events.list({
      calendarId,
      timeMin: now.toISOString(),
      timeMax: futureDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 500,  // Increased limit
      q: '[AVAILABLE]',
    })

    const events = response.data.items || []

    const availableSlots = events
      .filter(event => event.summary && event.summary.startsWith('[AVAILABLE]'))
      .map(event => {
        const startDateTime = new Date(event.start.dateTime || event.start.date)
        
        return {
          id: event.id,
          googleEventId: event.id,
          date: startDateTime,
          time: startDateTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: process.env.TIMEZONE || 'Africa/Lagos'
          }),
          title: event.summary.replace('[AVAILABLE]', '').trim(),
          isBooked: false
        }
      })

    // Update cache
    slotsCache.available = availableSlots
    slotsCache.lastFetchedAvailable = Date.now()

    console.log(`📅 Fetched and cached ${availableSlots.length} available slots`)
    return availableSlots

  } catch (error) {
    console.error('❌ Error fetching from Google Calendar:', error.message)
    
    // Return cached data if available, even if expired
    if (slotsCache.available) {
      console.log('⚠️ Returning stale cache due to error')
      return slotsCache.available
    }
    
    throw error
  }
}

// ===========================================
// FETCH ALL SLOTS (ADMIN)
// ===========================================
/**
 * Fetch all slots (available and booked) from Google Calendar
 * For admin view
 */
export const fetchAllSlotsFromCalendar = async (forceRefresh = false) => {
  try {
    // Return cached data if valid
    if (!forceRefresh && isCacheValid(slotsCache.lastFetchedAll) && slotsCache.all) {
      console.log('📦 Returning cached all slots')
      return slotsCache.all
    }

    const calendar = initializeCalendar()
    const calendarId = getCalendarId()

    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - PAST_DAYS)
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + FUTURE_DAYS)

    const response = await calendar.events.list({
      calendarId,
      timeMin: pastDate.toISOString(),
      timeMax: futureDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 500,
    })

    const events = response.data.items || []

    const slots = events
      .filter(event => 
        event.summary && 
        (event.summary.startsWith('[AVAILABLE]') || event.summary.startsWith('[BOOKED]'))
      )
      .map(event => {
        const startDateTime = new Date(event.start.dateTime || event.start.date)
        const isBooked = event.summary.startsWith('[BOOKED]')
        
        return {
          id: event.id,
          googleEventId: event.id,
          date: startDateTime,
          time: startDateTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: process.env.TIMEZONE || 'Africa/Lagos'
          }),
          title: event.summary.replace('[AVAILABLE]', '').replace('[BOOKED]', '').trim(),
          description: event.description || '',
          isBooked
        }
      })

    // Update cache
    slotsCache.all = slots
    slotsCache.lastFetchedAll = Date.now()

    console.log(`📅 Fetched and cached ${slots.length} total slots`)
    return slots

  } catch (error) {
    console.error('❌ Error fetching all slots from Google Calendar:', error.message)
    
    if (slotsCache.all) {
      console.log('⚠️ Returning stale cache due to error')
      return slotsCache.all
    }
    
    throw error
  }
}

// ===========================================
// MARK SLOT AS BOOKED
// ===========================================
/**
 * Mark a slot as booked in Google Calendar
 */
export const markSlotAsBooked = async (googleEventId, customerName, customerEmail, companyName) => {
  try {
    const calendar = initializeCalendar()
    const calendarId = getCalendarId()

    const event = await calendar.events.get({
      calendarId,
      eventId: googleEventId,
    })

    const updatedEvent = {
      ...event.data,
      summary: `[BOOKED] Consultation with ${customerName}`,
      description: `
Consultation Booking Details:
----------------------------
Customer: ${customerName}
Email: ${customerEmail}
Company: ${companyName}

Original slot: ${event.data.summary}
Booked at: ${new Date().toISOString()}
      `.trim(),
      colorId: '11', // Red color
    }

    const response = await calendar.events.update({
      calendarId,
      eventId: googleEventId,
      resource: updatedEvent,
    })

    // Clear cache so next fetch gets fresh data
    clearCache()

    console.log(`✅ Slot marked as booked: ${googleEventId}`)
    return response.data

  } catch (error) {
    console.error('❌ Error marking slot as booked:', error.message)
    throw error
  }
}

// ===========================================
// MARK SLOT AS AVAILABLE (FOR CANCELLATIONS)
// ===========================================
/**
 * Mark a slot as available again
 */
export const markSlotAsAvailable = async (googleEventId, originalTitle = 'Consultation Slot') => {
  try {
    const calendar = initializeCalendar()
    const calendarId = getCalendarId()

    const event = await calendar.events.get({
      calendarId,
      eventId: googleEventId,
    })

    const updatedEvent = {
      ...event.data,
      summary: `[AVAILABLE] ${originalTitle}`,
      description: 'Available consultation slot',
      colorId: '10', // Green color
    }

    const response = await calendar.events.update({
      calendarId,
      eventId: googleEventId,
      resource: updatedEvent,
    })

    // Clear cache
    clearCache()

    console.log(`✅ Slot marked as available: ${googleEventId}`)
    return response.data

  } catch (error) {
    console.error('❌ Error marking slot as available:', error.message)
    throw error
  }
}

// ===========================================
// CREATE SLOT IN CALENDAR
// ===========================================
/**
 * Create a new available slot in Google Calendar
 */
export const createSlotInCalendar = async (date, time, durationMinutes = 30) => {
  try {
    const calendar = initializeCalendar()
    const calendarId = getCalendarId()

    const [hours, minutes] = parseTime(time)
    const startDateTime = new Date(date)
    startDateTime.setHours(hours, minutes, 0, 0)

    const endDateTime = new Date(startDateTime)
    endDateTime.setMinutes(endDateTime.getMinutes() + durationMinutes)

    const event = {
      summary: '[AVAILABLE] Consultation Slot',
      description: 'Available consultation slot - created from BPH Growth website',
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: process.env.TIMEZONE || 'Africa/Lagos',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: process.env.TIMEZONE || 'Africa/Lagos',
      },
      colorId: '10',
    }

    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    })

    // Clear cache
    clearCache()

    console.log(`✅ Slot created: ${response.data.id}`)
    return response.data

  } catch (error) {
    console.error('❌ Error creating slot:', error.message)
    throw error
  }
}

// ===========================================
// DELETE SLOT FROM CALENDAR
// ===========================================
/**
 * Delete a slot from Google Calendar
 */
export const deleteSlotFromCalendar = async (googleEventId) => {
  try {
    const calendar = initializeCalendar()
    const calendarId = getCalendarId()

    await calendar.events.delete({
      calendarId,
      eventId: googleEventId,
    })

    // Clear cache
    clearCache()

    console.log(`🗑️ Slot deleted: ${googleEventId}`)
    return true

  } catch (error) {
    console.error('❌ Error deleting slot:', error.message)
    throw error
  }
}

// ===========================================
// HELPER FUNCTIONS
// ===========================================
const parseTime = (timeString) => {
  const match = timeString.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) {
    throw new Error(`Invalid time format: ${timeString}`)
  }

  let hours = parseInt(match[1])
  const minutes = parseInt(match[2])
  const period = match[3].toUpperCase()

  if (period === 'PM' && hours !== 12) {
    hours += 12
  } else if (period === 'AM' && hours === 12) {
    hours = 0
  }

  return [hours, minutes]
}

// ===========================================
// TEST CONNECTION
// ===========================================
/**
 * Test the Google Calendar connection
 */
export const testCalendarConnection = async () => {
  try {
    const calendar = initializeCalendar()
    const calendarId = getCalendarId()

    const response = await calendar.calendarList.get({
      calendarId,
    })

    console.log('✅ Google Calendar connection successful!')
    console.log(`📅 Calendar: ${response.data.summary}`)
    return {
      success: true,
      calendarName: response.data.summary,
      calendarId: response.data.id
    }

  } catch (error) {
    console.error('❌ Google Calendar connection failed:', error.message)
    return {
      success: false,
      error: error.message
    }
  }
}

// ===========================================
// GET CACHE STATUS
// ===========================================
/**
 * Get cache status for debugging
 */
export const getCacheStatus = () => {
  return {
    availableSlots: slotsCache.available?.length || 0,
    allSlots: slotsCache.all?.length || 0,
    availableCacheAge: slotsCache.lastFetchedAvailable 
      ? Math.round((Date.now() - slotsCache.lastFetchedAvailable) / 1000) + ' seconds ago'
      : 'not cached',
    allCacheAge: slotsCache.lastFetchedAll 
      ? Math.round((Date.now() - slotsCache.lastFetchedAll) / 1000) + ' seconds ago'
      : 'not cached',
    cacheValidFor: CACHE_DURATION / 1000 + ' seconds'
  }
}