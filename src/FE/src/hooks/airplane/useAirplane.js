import { BACKEND_BASE_URL } from "services/api";

export const useAirplane = () => {
    const getAllAirplane = async () => {
        const response = await fetch(`${BACKEND_BASE_URL}/airplane/all`, {
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    }

    const getAirplane = async (idAirplane) => {
        const response = await fetch(`${BACKEND_BASE_URL}/airplane/${idAirplane}`, {
            credentials: 'include',
        });
        const data = await response.json();
        return data;    
    }

    const addAirplane = async (airplane) => {
        const response = await fetch(`${BACKEND_BASE_URL}/airplane`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(airplane),
            credentials: 'include',
        });
    }

    const updateAirplane = async (airplane) => {
        const response = await fetch(`${BACKEND_BASE_URL}/airplane/${airplane.idAirplane}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(airplane),
            credentials: 'include',
        });
    }

    const deleteAirplane = async (idAirplane) => {
        const response = await fetch(`${BACKEND_BASE_URL}/airplane/${idAirplane}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    }   

    return { getAllAirplane, getAirplane, addAirplane, updateAirplane, deleteAirplane };
}