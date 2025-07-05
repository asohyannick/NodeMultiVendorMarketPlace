import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Contact from "../../../../model/contact/contact.model";
const showContacts = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const contacts = await Contact.find();
        return res.status(StatusCodes.OK).json({
            message: "Contact messages have been retrieved successfully!",
            contacts,
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

export default showContacts;