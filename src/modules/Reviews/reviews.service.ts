import { prisma } from "../../config/db"

export async function getReviewsService(id: string) {
    if (!id) {
        return {
            statusCode: 400,
            data: {
                message: "Service id is required"
            }
        }
    }
    const reviews = await prisma.review.findMany({
        where: {
            serviceId: id
        }
    })
    if (!reviews) {
        return {
            statusCode: 400,
            data: {
                message: "Reviews Not Exist"
            }
        }
    }

    return {
        statusCode: 200,
        data: {
            message: "Reviews fetched successfully",
            reviews
        }
    }
}

export async function addReviewsService(req: any) {
    const userId = req.user
    const { rating, comment } = req.body;
    const { id: serviceId } = req.paramsr.id;

        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                serviceId,
                userId,
            },
        });


        return {
            statusCode: 200,
            data: {
                message : 'add reviews successfully',
                review
            }
        }
    }
export async function updateReviewsService( req :any) {
    const userId = req.user
    const {id} = req.params
    const {rating, comment} = req.body
    const review = await prisma.review.findUnique({
        where: {
            id
        }
    })
    if (!review) {
        return {
            statusCode: 404,
            data: {
                message: 'Review not found'
            }
        }
    }
        const newReview = await prisma.review.update({
            where: {
                id,
                userId
            },
            data: {
                rating,
                comment,
            }
        })
        return {
            statusCode: 200,
            data: {
                message: 'update reviews successfully',
                newReview
            }
        }

}
export async function deleteReviewsService(req : any) {
    const {id} = req.params

    const review = await prisma.review.findUnique({
        where: {
            id
        }
    })
    if (!review) {
        return {
            statusCode: 404,
            data: {
                message: 'Review not found'
            }
        }
    }
        const newReview = await prisma.review.delete({
            where: {
                id
            }
        })
        return {
            statusCode: 200,
            data: {
                message: 'deleted reviews successfully',
                newReview
            }
        }
}