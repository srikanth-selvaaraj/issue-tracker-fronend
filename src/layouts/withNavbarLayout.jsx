import { Outlet } from "react-router-dom";
import NavigationBar from "../components/navBar";

const WithNavbarLayout = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    )
};

export default WithNavbarLayout;