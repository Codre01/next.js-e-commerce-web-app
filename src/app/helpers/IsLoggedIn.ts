
import { jwtDecode } from "jwt-decode";


export const isLoggedIn = (token: string | null) => {
    if (!token) {
        return false;
    }
    try {
        const decoded: Record<string, any> = jwtDecode(token);

        const isExpired = decoded.exp <= Math.floor(Date.now() / 1000);
        if (isExpired || !decoded.id) {
            return false;
        }
    } catch (err) {
        return false;
    }
    return true;
};

