import { BACKEND_BASE_URL } from "services/api";

export const useUser = () => {
    const getUserCount = async () => {
        const response = await fetch(`${BACKEND_BASE_URL}/user/userCount`, {
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    }

    return {
        getUserCount,
    }
}