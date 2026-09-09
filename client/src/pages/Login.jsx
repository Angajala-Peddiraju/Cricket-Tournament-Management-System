import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Auth.css";

function Login() {

    // State Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Login Function
    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            console.log(response.data);

            // Save Token
            localStorage.setItem("token", response.data.token);

            // Save User
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="auth-wrapper">

            <div className="auth-card">

                <div className="auth-header">
                    <h1>Welcome back</h1>
                    <p>Sign in to your CTMS account</p>
                </div>

                <form className="auth-form" onSubmit={handleLogin}>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        Login
                    </button>

                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>

            </div>

        </div>

    );

}

export default Login;