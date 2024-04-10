import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import LandingPage from "./pages/LandingPage.jsx"
import UserHomePage from "./pages/UserHomePage.jsx";
import MyBooksPage from "./pages/MyBooksPage.jsx";
import { userConfirmation } from "./utilities.jsx";
import SearchResultsPage from "./pages/SearchResultPage.jsx";
import ABookPage from "./pages/ABookPage.jsx";


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
                element: <SearchResultsPage />
            },
            {
                path: "/homePage/",
                element: <UserHomePage />
            },
            {
                path: "/myBooksPage/:shelfName/",
                element: <MyBooksPage />
            },
            {
                path: "/book/:bookName/",
                element: <ABookPage />
            },
        ]
    }
]);

export default router