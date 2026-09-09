import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menus = [

        {
            name: "Dashboard",
            path: "/dashboard"
        },

        {
            name: "Teams",
            path: "/teams"
        },

        {
            name: "Players",
            path: "/players"
        },

        {
            name: "Matches",
            path: "/matches"
        },

        {
            name: "Scoreboard",
            path: "/scoreboard"
        }

    ];

    return (

        <div
            style={{
                width: "230px",
                minHeight: "calc(100vh - 70px)",
                background: "#111827",
                paddingTop: "20px"
            }}
        >

            {

                menus.map((menu) => (

                    <Link
                        key={menu.path}
                        to={menu.path}
                        style={{
                            display: "block",
                            padding: "15px 25px",
                            color:

                                location.pathname === menu.path

                                    ? "#111827"

                                    : "white",

                            background:

                                location.pathname === menu.path

                                    ? "#FBBF24"

                                    : "transparent",

                            textDecoration: "none",

                            fontWeight: "bold",

                            marginBottom: "5px",

                            transition: ".3s"
                        }}
                    >

                        {menu.name}

                    </Link>

                ))

            }

        </div>

    );

}

export default Sidebar;