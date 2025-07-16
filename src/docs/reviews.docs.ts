export const reviewDocs = {
    '/reviews/{id}': {
        get: {
            tags: ['Reviews'],
            summary: 'Get reviews for a specific item',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Item ID to fetch reviews for',
                },
            ],
            responses: {
                200: { description: 'Reviews fetched successfully' },
                401: { description: 'Unauthorized' },
                404: { description: 'Item not found' },
            },
        },

        post: {
            tags: ['Reviews'],
            summary: 'Add a new review',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Item ID to add review for',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            rating: 5,
                            comment: 'Excellent product!',
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Review created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
            },
        },

        patch: {
            tags: ['Reviews'],
            summary: 'Update an existing review',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Review ID to update',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        example: {
                            rating: 4,
                            comment: 'Updated review comment',
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Review updated successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                404: { description: 'Review not found' },
            },
        },

        delete: {
            tags: ['Reviews'],
            summary: 'Delete a review',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Review ID to delete',
                },
            ],
            responses: {
                200: { description: 'Review deleted successfully' },
                401: { description: 'Unauthorized' },
                404: { description: 'Review not found' },
            },
        },
    },
};
