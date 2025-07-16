export const serviceDocs = {
    '/services': {
        get: {
            tags: ['Services'],
            summary: 'Get all services',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Services fetched successfully' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/services/{id}': {
        get: {
            tags: ['Services'],
            summary: 'Get specific service by ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: { description: 'Service fetched successfully' },
                401: { description: 'Unauthorized' },
                404: { description: 'Service not found' },
            },
        },
    },

    '/services/add-service': {
        post: {
            tags: ['Services'],
            summary: 'Create a new service',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            name: 'Haircut',
                            price: 50,
                            duration: 30,
                            description: 'Haircut service',
                            providerId: 'provider123'
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Service created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/services/update-service/{id}': {
        patch: {
            tags: ['Services'],
            summary: 'Update existing service',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            name: 'Updated Haircut',
                            price: 60,
                            duration: 40,
                            description: 'Updated service description'
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Service updated successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                404: { description: 'Service not found' },
            },
        },
    },

    '/services/delete-service/{id}': {
        delete: {
            tags: ['Services'],
            summary: 'Delete a service',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: { description: 'Service deleted successfully' },
                401: { description: 'Unauthorized' },
                404: { description: 'Service not found' },
            },
        },
    },
};
