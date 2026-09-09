import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div
            style={{
                height: "70px",
                background: "#1E3A8A",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.2)"
            }}
        >

            <div>

                <h2>

                    🏏 CTMS Admin Panel

                </h2>

            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >

                <span>

                    Welcome,

                    {" "}

                    <b>{user?.name}</b>

                </span>

                <button
                    onClick={logout}
                    style={{
                        background: "#EF4444",
                        padding: "10px 18px",
                        border: "none",
                        color: "white",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Navbar;