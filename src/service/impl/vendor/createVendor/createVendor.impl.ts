import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Vendor from "../../../../model/vendor/vendor.model";
import { VendorStatus } from "../../../interfac/vendor/vendor.interfac";
const createVendor = async (req: Request, res: Response): Promise<Response> => {
    const {
        name,
        description,
        contact,
        socialMedia,
        ratings,
        verified,
        commissions,
        feedback,
        documents,
    } = req.body;
    try {
        const newVendor = new Vendor({
            name,
            description,
            contact,
            socialMedia,
            ratings,
            status: VendorStatus.ACTIVE,
            lastLogin: Date.now(),
            verified,
            commissions,
            feedback,
            documents,
        });
        await newVendor.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new vendor has been created successfully!",
            newVendor
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default createVendor;