import App from "./App";
// import Error from "./components/Error/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
];

export default routes;
