import { Router } from "express"
import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isValid } from "../../middlewares/validation.middleware";
import { addService, deleteService, getAllServices, getSpicialService, updateService } from "./services.controller";
import { addServiceSchema } from "./services.validation";

const router = Router()

/**
 * @route GET /services/:id
 * @desc Get specific service by ID
 * @access Private
 */
router.get('/:id', isAuthentcated, getSpicialService)

/**
 * @route GET /services
 * @desc Get all services
 * @access Private
 */
router.get('', isAuthentcated, getAllServices)

/**
 * @route POST /services/add-service
 * @desc Create a new service
 * @access Private
 */
router.post('/add-service', isAuthentcated, isValid(addServiceSchema), addService)

/**
 * @route PATCH /services/update-service/:id
 * @desc Update existing service
 * @access Private
 */
router.patch('/update-service/:id', isAuthentcated, updateService)

/**
 * @route DELETE /services/delete-service/:id
 * @desc Delete a service
 * @access Private
 */
router.delete('/delete-service/:id', isAuthentcated, deleteService)

export default router