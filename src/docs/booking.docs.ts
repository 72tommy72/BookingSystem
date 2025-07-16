export const bookingDocs = {
    '/booking': {
        get: {
            tags: ['Booking'],
            summary: 'Get all bookings',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Bookings fetched successfully' },
                401: { description: 'Unauthorized' },
            },
        },
    },
    '/booking/{id}': {
        get: {
            tags: ['Booking'],
            summary: 'Get specific booking by ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Booking ID',
                },
            ],
            responses: {
                200: { description: 'Booking found' },
                401: { description: 'Unauthorized' },
                404: { description: 'Booking not found' },
            },
        },
    },

    '/booking/add-booking': {
        post: {
            tags: ['Booking'],
            summary: 'Create a new booking',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            date: '2025-08-01T14:00:00Z',
                            serviceId: 'abc123',
                            notes: 'Please arrive early',
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Booking created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/booking/update-booking/{id}': {
        patch: {
            tags: ['Booking'],
            summary: 'Update existing booking',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Booking ID',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            date: '2025-08-01T15:00:00Z',
                            notes: 'Updated note',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Booking updated successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                404: { description: 'Booking not found' },
            },
        },
    },

    '/booking/delete-booking/{id}': {
        delete: {
            tags: ['Booking'],
            summary: 'Delete a booking',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Booking ID',
                },
            ],
            responses: {
                200: { description: 'Booking deleted successfully' },
                401: { description: 'Unauthorized' },
                404: { description: 'Booking not found' },
            },
        },
    },
};
