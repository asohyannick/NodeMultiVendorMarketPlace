import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Contact from "../../../../model/contact/contact.model";
const updateContact = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            notes,
        } = req.body;
        const contact = await Contact.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            phone,
            address,
            notes,
        }, { new: true, runValidators: true });
        if (!contact) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Contact doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            message: "Contact message has been updated successfully!",
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

export default updateContact;