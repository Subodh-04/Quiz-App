import { useEffect, useState } from "react";
import img3 from "../assets/img3.png";
import { Navbar } from "../components/Navbar";
import Register from "../components/Register";
import Login from "../components/Login";

// eslint-disable-next-line react/prop-types
const Home = ({ showLogin }) => {
  const [showLoginForm, setShowLoginForm] = useState(showLogin || false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleSignUpClick = () => {
    setShowLoginForm(false);
  };

  useEffect(() => {
    setShowLoginForm(showLogin || false);
  }, [showLogin]);

  return (
    <>
      <Navbar handleLoginClick={handleLoginClick} handleSignUpClick={handleSignUpClick} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={img3}
              alt=""
              className="img-fluid"
              style={{ maxWidth: "95%", height: "auto" }}
            />
          </div>
          <div className="col-md-6">
            {showLoginForm ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
