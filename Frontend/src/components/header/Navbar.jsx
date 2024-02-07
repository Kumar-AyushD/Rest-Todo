import "./Navbar.css";
import { Link } from "react-router-dom";
import { RiTodoFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const Dispatch = useDispatch();
  const logOut = () => {
    sessionStorage.clear("id");
    Dispatch(authActions.logout());
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          <RiTodoFill /> todo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active" to="/about">
                About us
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active" to="/todo">
                todo
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link active btn-nav" to="/signup">
                    SignUp
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link active btn-nav" to="/signin">
                    SignIn
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active btn-nav"
                  to="/"
                  onClick={logOut}
                >
                  LogOut
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
