import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Vendor from "../../../../model/vendor/vendor.model";
import { VendorStatus } from "../../../interfac/vendor/vendor.interfac";
const updateVendor = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
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
        const vendor = await Vendor.findByIdAndUpdate(id, {
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
        }, { new: true, runValidators: true });
        if (!vendor) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Vendor doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Vendor has been updated successfully!",
            vendor
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default updateVendor;