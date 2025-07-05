import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Contact from "../../../../model/contact/contact.model";
const createContact = async (req: Request, res: Response): Promise<Response> => {
    const {
        firstName,
        lastName,
        email,
        phone,
        address,
        notes,
    } = req.body;
    try {
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            phone,
            address,
            notes,
        });
        await newContact.save();
        return res.status(StatusCodes.CREATED).json({
            message: "Your message has been submitted successfully!",
            newContact,
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

export default createContact;