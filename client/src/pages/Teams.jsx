import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

import api from "../services/api";

function Teams() {

    const [teams, setTeams] = useState([]);

    const [teamName, setTeamName] = useState("");
    const [captain, setCaptain] = useState("");
    const [coach, setCoach] = useState("");
    const [city, setCity] = useState("");
    const [owner, setOwner] = useState("");

    const [search, setSearch] = useState("");

    // -----------------------------
    // React 19 Safe useEffect
    // -----------------------------

    useEffect(() => {

        const loadTeams = async () => {

            try {

                const response = await api.get("/teams");

                setTeams(response.data.teams);

            }

            catch (error) {

                console.log(error);

            }

        };

        loadTeams();

    }, []);

    // -----------------------------
    // Refresh Teams
    // -----------------------------

    const fetchTeams = async () => {

        try {

            const response = await api.get("/teams");

            setTeams(response.data.teams);

        }

        catch (error) {

            console.log(error);

        }

    };

    // -----------------------------
    // Search Team
    // -----------------------------

    const searchTeam = async () => {

        if (search.trim() === "") {

            fetchTeams();

            return;

        }

        try {

            const response = await api.get(

                `/teams/search?keyword=${search}`

            );

            setTeams(response.data.teams);

        }

        catch (error) {

            console.log(error);

        }

    };
        // -----------------------------
    // Add Team
    // -----------------------------

    const addTeam = async () => {

        try {

            await api.post("/teams", {

                teamName,
                captain,
                coach,
                city,
                owner

            });

            alert("Team Added Successfully");

            setTeamName("");
            setCaptain("");
            setCoach("");
            setCity("");
            setOwner("");

            fetchTeams();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Failed To Add Team"

            );

        }

    };

    // -----------------------------
    // Delete Team
    // -----------------------------

    const deleteTeam = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this Team?"

        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/teams/${id}`);

            alert("Team Deleted Successfully");

            fetchTeams();

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <Navbar />

            <div className="page">

                <Sidebar />

                <div className="content">

                    <Card>

                        <h2>Add Team</h2>

                        <br />

                        <input
                            placeholder="Team Name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />

                        <input
                            placeholder="Captain"
                            value={captain}
                            onChange={(e) => setCaptain(e.target.value)}
                        />

                        <input
                            placeholder="Coach"
                            value={coach}
                            onChange={(e) => setCoach(e.target.value)}
                        />

                        <input
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <input
                            placeholder="Owner"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                        />

                        <button onClick={addTeam}>

                            Save Team

                        </button>

                    </Card>

                    <Card>

                        <h2>Search Team</h2>

                        <br />

                        <div
                            style={{
                                display: "flex",
                                gap: "10px"
                            }}
                        >

                            <input
                                placeholder="Search Team..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button onClick={searchTeam}>

                                Search

                            </button>

                            <button onClick={fetchTeams}>

                                Refresh

                            </button>

                        </div>

                    </Card>

                    <Card>

                        <h2>All Teams</h2>

                        <br />

                        <table>

                            <thead>

                                <tr>

                                    <th>Team</th>

                                    <th>Captain</th>

                                    <th>Coach</th>

                                    <th>City</th>

                                    <th>Owner</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    teams.length > 0 ?

                                    teams.map((team) => (

                                        <tr key={team._id}>

                                            <td>{team.teamName}</td>

                                            <td>{team.captain}</td>

                                            <td>{team.coach}</td>

                                            <td>{team.city}</td>

                                            <td>{team.owner}</td>

                                            <td>

                                                <button
                                                    style={{
                                                        background: "#dc2626"
                                                    }}
                                                    onClick={() => deleteTeam(team._id)}
                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td colSpan="6">

                                            No Teams Found

                                        </td>

                                    </tr>

                                }

                            </tbody>

                        </table>

                    </Card>

                </div>

            </div>

        </div>

    );

}

export default Teams;