import HomePage from "./pages/home";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ProjectsPage from "./pages/projectsPage";
import WithNavbarLayout from "./layouts/withNavbarLayout";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import WithoutNavbarLayout from "./layouts/withoutNavbarLayout";
import IssuesPage from "./pages/issuesPage";
import ProductedRoutes from "./components/productedRoutes";


const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {/* pages with navbar */}
                <Route element={
                    <ProductedRoutes>
                        <WithNavbarLayout />
                    </ProductedRoutes>
                    }>
                        <Route index path='/' element={<HomePage />} />
                        <Route path='projects' element={<ProjectsPage />} />
                        <Route path='issues' element={<IssuesPage />} />
                </Route>

                {/* Pages without navbar */}
                <Route element={<WithoutNavbarLayout />}>
                    <Route path='login' element={<LoginPage />} />
                    <Route path='signup' element={<SignupPage />} />
                </Route>
            </>
        )
    );

    return <RouterProvider router={router}></RouterProvider>
};

export default App;