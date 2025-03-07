/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Button from "../Button";
import { PiCurrencyInrBold } from "react-icons/pi";
import { createPaymentOrder } from "../../http/api";
import { useBookingSlotFetchQuery, useUpdateBookingRideStatusMutation } from "../../hook/useBookingSlot";
import { IPagination } from "../../types";
import { useUser } from "@clerk/clerk-react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface BookedSlot {
    slotId: string;
    _id: string;
    id: number;
    userName: string;
    name: string;
    address: string;
    totalHours: number;
    totalSlots: number;
    amount: number;
    status: string;
    paymentStatus: string;
    date: string;
}

interface Props {
    bookedSlots: BookedSlot[];
}

interface IOrder {
    amount: number;
    currency: number;
    id: string;
}

const BookedSlotsCard: React.FC<Props> = ({ bookedSlots }) => {
    const { user } = useUser();

    const [pagination] = useState<IPagination>({
        page: 1,
        limit: 25,
        sortBy: "createdAt",
        order: "desc",
        clerkId: user!.id
    })

    const { refetch } = useBookingSlotFetchQuery(pagination);
    const { mutate } = useUpdateBookingRideStatusMutation();
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (data: { _id: string, id: string }) => {
        try {

            console.log(data);

            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                alert("Failed to load Razorpay. Please try again.");
                return;
            }

            const orderData = await createPaymentOrder(data);
            const order: IOrder = orderData.data;

            const options = {
                key: "rzp_test_cMQQFYPaYpEzfm", // Replace with actual Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: "Your Company",
                description: "Test Transaction",
                order_id: order.id,
                handler: async () => {
                    console.log(data);
                    mutate({ _id: data.id, paymentStatus: "Paid" });
                    refetch();
                    alert("Payment successful!");
                },

                prefill: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    contact: "9999999999",
                },

                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2 className="pt-4 text-2xl font-semibold mb-4 text-gray-700">Booked Slots</h2>
            <div className="mt-6 w-full mx-auto ">
                {bookedSlots.length === 0 ? (
                    <p className="text-gray-500">No slots booked yet.</p>
                ) : (
                    <div className="grid gride-col-1 sm:grid-cols-3 gap-4">
                        {bookedSlots.map((slot) => (
                            <div
                                key={slot.id}
                                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-end border"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-600">{slot.name}</h3>
                                    <p className="text-gray-500">{slot.address}</p>
                                    <p>Booked By: <strong>{slot.userName}</strong></p>
                                    <p>Total Hours: <strong>{slot.totalHours}</strong></p>
                                    <p>Total Slots: <strong>{slot.totalSlots}</strong></p>
                                    <p>Date: <strong>{new Date(slot.date).toLocaleDateString()}</strong></p>
                                    <p className="flex items-center">Total Amount:
                                        <PiCurrencyInrBold className="ml-1" color="green" />
                                        <strong>{slot.amount}</strong>
                                    </p>
                                    <p className="mt-2">
                                        Payment Status:
                                        <span className={`ml-2 px-2 py-1 text-sm font-medium rounded-md ${slot.paymentStatus === "Paid" ? "bg-green-700 font-bold text-white" : "bg-yellow-500 text-white"
                                            }`}>
                                            {slot.paymentStatus}
                                        </span>
                                    </p>
                                </div>

                                {
                                    slot.paymentStatus.toLowerCase() === "pending" &&
                                    <Button onClick={() => handlePayment({ _id: slot.slotId, id: slot._id })}>Pay</Button>
                                }

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookedSlotsCard;
