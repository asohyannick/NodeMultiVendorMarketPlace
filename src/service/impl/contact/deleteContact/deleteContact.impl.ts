import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Contact from "../../../../model/contact/contact.model";
const deleteContact = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Contact doesn't exist!"});
        }
        return res.status(StatusCodes.OK).json({
            message: "Contact message has been deleted successfully!",
            contact,
        });
    } catch (error) {
        console.error("Error occured!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        })
    }
}

export default deleteContact;