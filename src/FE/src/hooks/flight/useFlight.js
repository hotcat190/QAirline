import { BACKEND_BASE_URL } from "services/api";

export const useFlight = () => {
    const getAllFlights = async () => {
        const response = await fetch(`${BACKEND_BASE_URL}/flight`, {
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    }

    const getAllFlightsAdmin = async () => {
        const response = await fetch(`${BACKEND_BASE_URL}/flight/adminAll`, {
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    }

    return {
        getAllFlights,
        getAllFlightsAdmin,
    }
}