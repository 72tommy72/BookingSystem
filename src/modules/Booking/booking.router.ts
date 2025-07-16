import { Router } from "express";

import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isValid } from "../../middlewares/validation.middleware";
import { addBooking, deleteBooking, getBookings, getSpecialBooking, updateBooking } from "./booking.controller";
import { addBookingSchema } from "./booking.validation";

const router = Router()

/**
 * @route GET /booking/:id
 * @desc Get specific booking by ID
 * @access Private
 */
router.get("/:id", isAuthentcated, getSpecialBooking)

/**
 * @route GET /booking
 * @desc Get all bookings
 * @access Private
 */
router.get('/', isAuthentcated, getBookings)

/**
 * @route POST /booking/add-booking
 * @desc Create a new booking
 * @access Private
 */
router.post('/add-booking', isAuthentcated, isValid(addBookingSchema), addBooking)

/**
 * @route PATCH /booking/update-booking/:id
 * @desc Update existing booking
 * @access Private
 */
router.patch('/update-booking/:id', isAuthentcated, updateBooking)

/**
 * @route DELETE /booking/delete-booking/:id
 * @desc Delete a booking
 * @access Private
 */
router.delete('/delete-booking/:id', isAuthentcated, deleteBooking)

export default router