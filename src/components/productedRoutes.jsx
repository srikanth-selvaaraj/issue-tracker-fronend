import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../network/user";

const ProductedRoutes = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        getAccess().catch(() => setIsAuthorized(false));
    }, [])

    const getRefresh = async () => {
        const refresh_token = localStorage.getItem('refresh_token');

        if (!refresh_token) {
            setIsAuthorized(false);
        }

        try {
            const response = refreshToken({'refresh': refresh_token})
            console.log(response);

            if (response.status === 200 ) {
                localStorage.setItem('access_token', response.data.access_token);
                setIsAuthorized(true);
            } else {
                localStorage.clear()
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false);
        }
    };

    const getAccess = async () => {
        const access_token = localStorage.getItem('access_token');

        if (!access_token) {
            setIsAuthorized(false);
            return
        }

        const decoded = jwtDecode(access_token);
        const tokenExpiration = decoded.exp;
        const now = new Date() / 1000;

        if (tokenExpiration < now) {
            await getRefresh();
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <div>Loding</div>
    }

    if (!isAuthorized) {
        localStorage.clear();
    }

    return isAuthorized ? children : <Navigate to='/login' />;
}

export default ProductedRoutes;