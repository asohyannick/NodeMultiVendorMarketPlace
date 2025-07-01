import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Vendor from "../../../../model/vendor/vendor.model";
const deleteVendor = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const vendor = await Vendor.findByIdAndDelete(id);
        if (!vendor) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Vendor doesn't exist!"});
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Vendor has been deleted successfully!",
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

export default deleteVendor;