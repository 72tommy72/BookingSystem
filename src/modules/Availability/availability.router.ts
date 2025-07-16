import { Router } from "express";
import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { addAppointment, deleteAppointment, getAvailabilAppointments, getSpecialAvailabilAppointment, updateAppointment } from "./available.controller";
import { isValid } from "../../middlewares/validation.middleware";
import { addAppointmentSchema, updateAppointmentSchema } from "./available.validation";

const router = Router()

/**
 * @route GET /availability/:id
 * @desc Get specific available appointment
 * @access Private
 */
router.get("/:id", isAuthentcated, getSpecialAvailabilAppointment)

/**
 * @route GET /availability
 * @desc Get all available appointments
 * @access Private
 */
router.get('/', isAuthentcated, getAvailabilAppointments)

/**
 * @route POST /availability/add-appointment
 * @desc Add new appointment
 * @access Private
 */
router.post('/add-appointment', 
    isAuthentcated,
    isValid(addAppointmentSchema),
    addAppointment
)

/**
 * @route DELETE /availability/delete-appointment/:id
 * @desc Delete specific appointment
 * @access Private
 */
router.delete(
    "/delete-appointment/:id",
    isAuthentcated,
    deleteAppointment
)

/**
 * @route PUT /availability/update-appointment/:id
 * @desc Update specific appointment
 * @access Private
 */
router.put(
    "/update-appointment/:id",
    isAuthentcated,
    isValid(updateAppointmentSchema),
    updateAppointment
)

export default router