import { Link } from "react-router-dom";
import useSticky from "../hooks/use-sticky";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { userLoggedOut } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const { sticky } = useSticky();
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
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
