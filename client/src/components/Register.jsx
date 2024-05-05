import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

  const navigate=useNavigate();

  const [user, setUser] = useState({
    username: "",
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
      const response = await fetch(`https://quizkaroo.onrender.com/api/auth/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log("res from server",res_data);
      if (response.ok) {
        setUser({
          username: "",
          email: "",
          password: "",
        });
        toast.success("User Registered Successfully");
        navigate("/login");
      }else{
        toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message);
      }
    } catch (error) {
      console.log("register:", error);
    }
  };

  return (
    <div className="card border-0">
      <div className="card-body">
        <h5 className="card-title">Sign In</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="username"
              id="username"
              value={user.username}
              onChange={handleInput}
              required
              autoComplete="off"
            />
          </div>
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
              value={user.password}
              onChange={handleInput}
              required
              autoComplete="off"
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
