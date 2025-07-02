import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../../../../model/product/product.model";
const searchProducts = async (req: Request, res: Response): Promise<Response> => {
    const {
        name,
        description,
        minPrice,
        maxPrice,
        stockQuantity,
        images,
        minRatings,
        maxRatings,
        tags,
        sortBy,
        sortOrder = 'asc',
        page = 1,
        limit = 12,
    } = req.query;
    try {
        const filter: any = {};
        const pageNumber = typeof page === 'string' ? parseInt(page) : 1;
        const limitNumber = typeof limit === 'string' ? parseInt(limit) : 12;
        if (name) {
            filter.name = { $regex: name, options: 'i' }
        }
        if (description) {
            filter.description = { $regex: description, options: 'i' }
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if (images && typeof images === 'string') {
            filter.images = { $in: images.split(',').map(image => image.trim()) }
        } else if (Array.isArray(images)) {
            filter.images = { $in: images.map(image => (typeof image === 'string' ? image.trim() : image)) }
        }
        if (stockQuantity) {
            filter.description = Number(stockQuantity);
        }
        if (minRatings || maxRatings) {
            filter.ratings = {};
            if (minRatings) filter.ratings.$gte = Number(minRatings);
            if (maxRatings) filter.ratings.$lte = Number(maxRatings);
        }
        if (tags && typeof tags === 'string') {
            filter.tags = { $in: tags.split(',').map(tag => typeof tag === 'string' ? tag.trim() : tag) }
        } else if (Array.isArray(tags)) {
            filter.tags = { $in: tags.map(tag => (typeof tag === 'string' ? tag.trim() : tag)) };
        }
        const sortOptions: any = {};
        if (sortBy && typeof sortBy === 'string') {
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }
        const totalProducts = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .sort(sortOptions)
            .skip((pageNumber - 1) * limitNumber) // calculate the number of documents to skip
            .limit(Number(limit)) // Limit the number of documents to returned from the database
        return res.status(StatusCodes.OK).json({
            success: true,
            totalProducts,
            products,
            totalPages: Math.ceil(totalProducts / limitNumber),
            currentPage: pageNumber
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default searchProducts;