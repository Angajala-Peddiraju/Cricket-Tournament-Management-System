import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

import api from "../services/api";

function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [teams, setTeams] = useState(0);
    const [players, setPlayers] = useState(0);
    const [matches, setMatches] = useState(0);
    const [liveMatches, setLiveMatches] = useState(0);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const teamRes = await api.get("/teams");

                setTeams(teamRes.data.count);

                const playerRes = await api.get("/players");

                setPlayers(playerRes.data.count);

                const matchRes = await api.get("/matches");

                setMatches(matchRes.data.count);

                const live = matchRes.data.matches.filter(

                    (m) => m.status === "Live"

                ).length;

                setLiveMatches(live);

            }

            catch (error) {

                console.log(error);

            }

        };

        loadDashboard();

    }, []);

    return (

        <div>

            <Navbar />

            <div className="page">

                <Sidebar />

                <div className="content">

                    <Card>

                        <h1>

                            Welcome,

                            {" "}

                            {user?.name}

                        </h1>

                        <br />

                        <h2>

                            Cricket Tournament Management System

                        </h2>

                        <br />

                        <h3>

                            Role :

                            {" "}

                            {user?.role}

                        </h3>

                    </Card>

                    <div

                        style={{

                            display: "grid",

                            gridTemplateColumns: "repeat(4,1fr)",

                            gap: "20px"

                        }}

                    >

                        <Card>

                            <h2>Total Teams</h2>

                            <br />

                            <h1>{teams}</h1>

                        </Card>

                        <Card>

                            <h2>Total Players</h2>

                            <br />

                            <h1>{players}</h1>

                        </Card>

                        <Card>

                            <h2>Total Matches</h2>

                            <br />

                            <h1>{matches}</h1>

                        </Card>

                        <Card>

                            <h2>Live Matches</h2>

                            <br />

                            <h1>{liveMatches}</h1>

                        </Card>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;