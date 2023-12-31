import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { userLoggedOut } from "../redux/features/auth/authSlice";
import SearchForm from "../components/search-form";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to={`/`}>
            Book Shop
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={`/`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/all-book`}>
                  All Books
                </Link>
              </li>
              {!user?.email && (
                <li className="nav-item">
                  <Link className="nav-link" to={`/login`}>
                    Sign in
                  </Link>
                </li>
              )}
              {user?.email && (
                <li className="nav-item">
                  <button
                    onClick={() => dispatch(userLoggedOut())}
                    className="nav-link"
                  >
                    Logout
                  </button>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to={`/register`}>
                  Sign up
                </Link>
              </li>
              {user?.email && (
                <li className="nav-item">
                  <Link className="nav-link" to={`/add-new-book`}>
                    Add New Book
                  </Link>
                </li>
              )}
            </ul>
            <SearchForm/>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
