import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Auth.css";

function Register() {

    // State Variables
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Viewer");
    const navigate = useNavigate();

    // Register Function
    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/register", {
                name,
                email,
                password,
                role
            });

            console.log(response.data);

            // Save Token
            localStorage.setItem("token", response.data.token);

            // Save User
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Registration Successful!");

            navigate("/dashboard");

        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.message || "Registration Failed"
            );

        }

    };

    return (

        <div className="auth-wrapper">

            <div className="auth-card">

                <div className="auth-header">
                    <h1>Create account</h1>
                    <p>Register to start using CTMS</p>
                </div>

                <form className="auth-form" onSubmit={handleRegister}>

                    <div className="form-group">
                        <label htmlFor="name">Full name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="Viewer">Viewer</option>
                            <option value="Scorer">Scorer</option>
                            <option value="TeamManager">Team manager</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="auth-button">
                        Register
                    </button>

                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/">Login here</Link>
                </div>

            </div>

        </div>

    );

}

export default Register;