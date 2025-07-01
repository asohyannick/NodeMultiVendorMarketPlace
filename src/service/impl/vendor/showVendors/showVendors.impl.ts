import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Vendor from "../../../../model/vendor/vendor.model";
const showVendors = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const vendors = await Vendor.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Vendors have been fetched successfully!",
            vendors
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default showVendors;