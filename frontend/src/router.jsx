import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import LandingPage from "./pages/LandingPage.jsx"
import ABookPage from "./pages/ABookPage.jsx";
import UserHomePage from "./pages/UserHomePage.jsx";
import MyBooksPage from "./pages/MyBooksPage.jsx";
import { userConfirmation } from "./utilities.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: userConfirmation,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: "/searchresults/:searchInput/",
                element: <ABookPage />
            },
            {
                path: "/homePage/",
                element: <UserHomePage />
            },
            {
                path: "/myBooksPage/:shelfName/",
                element: <MyBooksPage />
            }
        ]
    }
]);

export default router