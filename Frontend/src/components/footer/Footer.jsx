import "./footer.css";

const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top footer">
      <p className="text-body-secondary"><p className="p-0">todoApp</p>© 2024 Ayush Thakur</p>

      <a
        className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none" href="/"
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
      </a>

      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-body-secondary">
            Home
          </a>
        </li>

        <li className="nav-item">
          <a href="/about" className="nav-link px-2 text-body-secondary">
            About
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
