import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://quiz-server-z3xp.onrender.com/api/auth/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.extraDetails || errorData.message || "Registration failed."
        );
      }

      setUser({
        username: "",
        email: "",
        password: "",
      });
      toast.success("User Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="card border-0">
      <div className="card-body">
        <h5 className="card-title">Register</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              id="username"
              value={user.username}
              onChange={handleInput}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              id="email"
              value={user.email}
              onChange={handleInput}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              id="password"
              value={user.password}
              onChange={handleInput}
              required
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
