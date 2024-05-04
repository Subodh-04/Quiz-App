import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(`https://quizkaroo.onrender.com/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      console.log("login:", response);
      if (response.ok) {
        alert("login successfull");
        setUser({ email: "", password: "" });
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/topic");
      } else {
        alert("Invalid Credentials");
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card border-0">
      <div className="card-body">
        <h5 className="card-title">Log in</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              id="password"
              value={user.pasword}
              onChange={handleInput}
              required
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
