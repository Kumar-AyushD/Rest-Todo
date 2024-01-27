import "./Navbar.css";
import { RiTodoFill } from "react-icons/ri";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" href="#">
          <RiTodoFill /> todo
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item mx-2">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link active" aria-current="page" href="#">
                About us
              </a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link active btn-nav" aria-current="page" href="#">
                SignUp
              </a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link active btn-nav" aria-current="page" href="#">
                SignIn
              </a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link active btn-nav" aria-current="page" href="#">
                LogOut
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                <img className="logo" src="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
