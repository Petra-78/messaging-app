import App from "./App";
// import Error from "./components/Error/Error";
import Login from "./pages/Login";
import Home from "./pages/Home";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
    ],
  },
];

export default routes;
