import { checkSchema } from "express-validator";

export const bookingValidation = checkSchema({
    id: {
        in: ["body"],
        exists: { errorMessage: "Booking ID is required" },
        isMongoId: { errorMessage: "Invalid Booking ID format" },
    },
    date: {
        in: ["body"],
        exists: { errorMessage: "Date is required" },
        isISO8601: { errorMessage: "Invalid date format. Use ISO 8601 format" },
        notEmpty: { errorMessage: "Date cannot be empty" },
    },
    name: {
        in: ["body"],
        exists: { errorMessage: "Name is required" },
        isString: { errorMessage: "Name must be a string" },
        notEmpty: { errorMessage: "Name cannot be empty" },
        isLength: {
            options: { min: 3 },
            errorMessage: "Name must be at least 3 characters long",
        },
    },
    totalHours: {
        in: ["body"],
        exists: { errorMessage: "Total Hours is required" },
        isInt: {
            options: { min: 1 },
            errorMessage: "Total Hours must be a positive integer",
        },
        notEmpty: { errorMessage: "Total Hours cannot be empty" },
    },
    totalSlots: {
        in: ["body"],
        exists: { errorMessage: "Total Slot is required" },
        isInt: {
            options: { min: 1 },
            errorMessage: "Total Slot must be at least 1",
        },
        notEmpty: { errorMessage: "Total Slot cannot be empty" },
    },
    amount: {
        in: ["body"],
        exists: { errorMessage: "Amount is required" },
        isFloat: {
            options: { min: 0 },
            errorMessage: "Amount must be a positive number",
        },
        notEmpty: { errorMessage: "Amount cannot be empty" },
    },
    clerkId: {
        in: ["body"],
        exists: { errorMessage: "Clerk ID is required" },
        isString: { errorMessage: "Clerk ID must be a string" },
        notEmpty: { errorMessage: "Clerk ID cannot be empty" },
        isLength: {
            options: { min: 3 },
            errorMessage: "Clerk ID must be at least 3 characters long",
        },
    },
    paymentStatus: {
        in: ["body"],
        exists: { errorMessage: "Payment Status is required" },
        isString: { errorMessage: "Payment Status must be a string" },
        isIn: {
            options: [["Paid", "Pending"]],
            errorMessage: "Payment Status must be either 'Paid' or 'Pending'",
        },
    },
});

