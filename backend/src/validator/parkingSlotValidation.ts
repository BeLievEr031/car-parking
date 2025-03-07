import { checkSchema } from "express-validator";

export const parkingSlotValidation = checkSchema({
    clerkId: {
        in: ["body"],
        exists: { errorMessage: "ClerkId is required" },
        isString: { errorMessage: "ClerkId must be a string" },
        notEmpty: { errorMessage: "ClerkId cannot be empty" },
        isLength: {
            options: { min: 3 },
            errorMessage: "ClerkId must be at least 3 characters long",
        },
    },
    name: {
        in: ["body"],
        exists: { errorMessage: "Parking Area Name is required" },
        isString: { errorMessage: "Parking Area Name must be a string" },
        notEmpty: { errorMessage: "Parking Area Name cannot be empty" },
        isLength: {
            options: { min: 3 },
            errorMessage: "Parking Area Name must be at least 3 characters long",
        },
    },
    address: {
        in: ["body"],
        exists: { errorMessage: "Location is required" },
        isString: { errorMessage: "Location must be a string" },
        notEmpty: { errorMessage: "Location cannot be empty" },
    },
    pinCode: {
        in: ["body"],
        exists: { errorMessage: "Pin Code is required" },
        isString: { errorMessage: "Pin Code must be a string" },
        notEmpty: { errorMessage: "Pin Code cannot be empty" },
        isLength: {
            options: { min: 4, max: 10 },
            errorMessage: "Pin Code must be between 4 and 10 characters",
        },
    },
    totalSlots: {
        in: ["body"],
        exists: { errorMessage: "Total Slots is required" },
        isInt: { options: { min: 1 }, errorMessage: "Total Slots must be a positive integer" },
        notEmpty: { errorMessage: "Total Slots cannot be empty" },
    },
    availableSlots: {
        in: ["body"],
        exists: { errorMessage: "Available Slots is required" },
        isInt: { options: { min: 0 }, errorMessage: "Available Slots must be a non-negative integer" },
        notEmpty: { errorMessage: "Available Slots cannot be empty" },
    },
    hourlyRate: {
        in: ["body"],
        exists: { errorMessage: "Hourly Rate is required" },
        isFloat: { options: { min: 0 }, errorMessage: "Hourly Rate must be a positive number" },
        notEmpty: { errorMessage: "Hourly Rate cannot be empty" },
    },
    status: {
        in: ["body"],
        exists: { errorMessage: "Status is required" },
        isString: { errorMessage: "Status must be a string" },
        isIn: { options: [["Active", "Inactive"]], errorMessage: "Status must be either 'Active' or 'Inactive'" },
    },
    // paymentStatus: {
    //     in: ["body"],
    //     exists: { errorMessage: "Payment Status is required" },
    //     isString: { errorMessage: "Payment Status must be a string" },
    //     isIn: { options: [["Paid", "Pending"]], errorMessage: "Payment Status must be either 'Paid' or 'Pending'" },
    // },
    // lat: {
    //     in: ["body"],
    //     exists: { errorMessage: "Latitude is required" },
    //     isFloat: {
    //         options: { min: -90, max: 90 },
    //         errorMessage: "Latitude must be a number between -90 and 90"
    //     },
    //     notEmpty: { errorMessage: "Latitude cannot be empty" },
    // },
    // lng: {
    //     in: ["body"],
    //     exists: { errorMessage: "Longitude is required" },
    //     isFloat: {
    //         options: { min: -180, max: 180 },
    //         errorMessage: "Longitude must be a number between -180 and 180"
    //     },
    //     notEmpty: { errorMessage: "Longitude cannot be empty" },
    // },
});
