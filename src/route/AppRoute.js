import Home from '../pages/Home';
import Books from '../pages/Books';
import RequiredAuth from '../components/RequiredAuth/RequiredAuth';
import React, { Suspense } from "react"
import PostDetail from '../pages/PostDetail';

const { useRoutes } = require("react-router-dom");


const LoginLazy = React.lazy(() => import("../pages/Login"));
const AppRoutes = () => {

    const elements = useRoutes([
      {
        path: "/",
        element: (
          //<RequiredAuth>
          <Home />
          //</RequiredAuth>
        ),
      },
      {
        path: "/books",
        element: (
          //<RequiredAuth>
          <Books />
          //</RequiredAuth>
        ),
      },
      {
        path: "/books/:id",
        element: (
          //<RequiredAuth>
          <PostDetail />
          //</RequiredAuth>
        ),
      },
      {
        path: "/login",
        element: <LoginLazy />,
      },
    ]);
    return elements;
}
export default AppRoutes;