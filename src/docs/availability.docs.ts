export const availableDocs = {
    '/availability': {
        get: {
            tags: ['Availability'],
            summary: 'Get all available appointments',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Appointments fetched successfully' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/availability/{id}': {
        get: {
            tags: ['Availability'],
            summary: 'Get a specific appointment by ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Appointment ID',
                },
            ],
            responses: {
                200: { description: 'Appointment found' },
                401: { description: 'Unauthorized' },
                404: { description: 'Appointment not found' },
            },
        },
    },

    '/availability/add-appointment': {
        post: {
            tags: ['Availability'],
            summary: 'Add a new appointment',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            date: '2025-08-01T10:00:00Z',
                            providerId: 'abc123',
                            duration: 30,
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Appointment created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/availability/delete-appointment/{id}': {
        delete: {
            tags: ['Availability'],
            summary: 'Delete an appointment',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Appointment ID',
                },
            ],
            responses: {
                200: { description: 'Appointment deleted successfully' },
                401: { description: 'Unauthorized' },
                404: { description: 'Appointment not found' },
            },
        },
    },

    '/availability/update-appointment/{id}': {
        put: {
            tags: ['Availability'],
            summary: 'Update an appointment',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Appointment ID',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            date: '2025-08-01T12:00:00Z',
                            duration: 45,
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Appointment updated successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                404: { description: 'Appointment not found' },
            },
        },
    },
};
