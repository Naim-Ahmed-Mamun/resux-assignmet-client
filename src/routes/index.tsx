import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import BookDetails from '../pages/BookDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AllBooks from '../pages/AllBooks';
import AddNewBookPage from '../pages/AddNewBook';
import EditBookPage from '../pages/EditBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/book-details/:id',
    element: <BookDetails />,
  },
  {
    path: '/all-book',
    element: <AllBooks />,
  },
  {
    path: '/add-new-book',
    element: <AddNewBookPage />,
  },
  {
    path: '/edit-book/:id',
    element: <EditBookPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
