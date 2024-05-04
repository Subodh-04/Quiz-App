import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Topic = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/login");
    } else {
      const user = JSON.parse(loggedInUser);
      setUsername("");
      fetchUsername(user.userId);
    }
  }, [navigate]);

  const fetchUsername = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/user/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setUsername(userData.username);
      } else {
        console.error("Error fetching username:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

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
      <div className="nav navbar container">
        <h1 className="navbar-brand fs-3">QuizKaroo</h1>
        <p className="fs-4 fw-semi-bold fst-normal m-0">Welcome, {username}</p>
        <button
          className="text-decoration-none border text text-dark fw-bold ps-3 pe-3 pt-2 pb-2 rounded me-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

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
