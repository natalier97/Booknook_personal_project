import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import LandingPage from "./pages/LandingPage.jsx"
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
        ]
    }
]);

export default router