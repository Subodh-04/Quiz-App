import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

const Topic = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/login");
    } else {
      const user = JSON.parse(loggedInUser);
      setUsername(user.username);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const categories = [
    { id: 1, name: "Linux" },
    { id: 2, name: "Docker" },
    { id: 3, name: "cms" },
    { id: 4, name: "code" },
    // Add more categories as needed
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/questions/${categoryName}`);
    console.log(categoryName);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <h1 className="navbar-brand fs-3">QuizKaroo</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown d-lg-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {username}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
            <p className="fs-4 fw-semi-bold fst-normal m-0 d-none d-lg-block">
              Welcome, {username}
            </p>
            <button
              className="btn btn-outline-dark d-none d-lg-block"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="mb-4">Choose a Category:</h2>
        <div className="row">
          {categories.map((category) => (
            <div key={category.id} className="col-md-4 mb-3">
              <div
                className="card cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Topic;
