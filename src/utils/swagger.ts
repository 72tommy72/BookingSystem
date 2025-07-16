//@ts-ignore
import swaggerJSDoc from 'swagger-jsdoc';
// import { swaggerPaths } from './docs';
import authDocs from '../docs/auth.docs';
import { reviewDocs } from '../docs/reviews.docs';
import { serviceDocs } from '../docs/service.docs';
import { bookingDocs } from '../docs/booking.docs';
import { availableDocs } from '../docs/availability.docs';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Commerce API',
            version: '1.0.0',
            description: 'API documentation for the E-commerce project',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
        paths: {
            ...authDocs,
            ...reviewDocs,
            ...serviceDocs,
            ...bookingDocs,
            ...availableDocs,
        },
    },
    apis: [

    ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
