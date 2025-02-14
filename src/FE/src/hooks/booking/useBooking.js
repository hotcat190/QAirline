import { BACKEND_BASE_URL } from "services/api";

export const useBooking = () => {
    const getAllBookings = async () => {
        const response = await fetch(`${BACKEND_BASE_URL}/booking`, {
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    }

    const getTicketsSold = async () => {
        const response = await fetch(`${BACKEND_BASE_URL}/booking/getTicketsSold`, {
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    }

    return {
        getAllBookings,
        getTicketsSold,
    }
}