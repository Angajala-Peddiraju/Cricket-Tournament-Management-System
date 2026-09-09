import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Matches() {

    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);

    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [matchDate, setMatchDate] = useState("");
    const [venue, setVenue] = useState("");

    // -----------------------------
    // Load Matches and Teams
    // -----------------------------
    useEffect(() => {

        const fetchData = async () => {

            try {

                const matchRes = await api.get("/matches");
                setMatches(matchRes.data.matches);

                const teamRes = await api.get("/teams");
                setTeams(teamRes.data.teams);

            } catch (error) {

                console.log(error);

            }

        };

        fetchData();

    }, []);

    // -----------------------------
    // Refresh Matches
    // -----------------------------
    const loadMatches = async () => {

        try {

            const response = await api.get("/matches");

            setMatches(response.data.matches);

        } catch (error) {

            console.log(error);

        }

    };

    // -----------------------------
    // Add Match
    // -----------------------------
    const addMatch = async () => {

        if (team1 === team2) {

            alert("Team 1 and Team 2 cannot be the same.");

            return;

        }

        try {

            await api.post("/matches", {

                team1,
                team2,
                matchDate,
                venue

            });

            alert("Match Created Successfully");

            setTeam1("");
            setTeam2("");
            setMatchDate("");
            setVenue("");

            loadMatches();

        } catch (error) {

            alert(error.response?.data?.message || "Unable to Create Match");

        }

    };

    // -----------------------------
    // Delete Match
    // -----------------------------
    const deleteMatch = async (id) => {

        try {

            await api.delete(`/matches/${id}`);

            alert("Match Deleted Successfully");

            loadMatches();

        } catch (error) {

            alert(error.response?.data?.message || "Unable to Delete Match");

        }

    };

    return (

        <div>

            <Navbar />

            <div style={{ display: "flex" }}>

                <Sidebar />

                <div
                    style={{
                        padding: "30px",
                        width: "100%"
                    }}
                >

                    <h1>Matches</h1>

                    <br />

                    <select
                        value={team1}
                        onChange={(e) => setTeam1(e.target.value)}
                    >

                        <option value="">Select Team 1</option>

                        {

                            teams.map((team) => (

                                <option
                                    key={team._id}
                                    value={team._id}
                                >

                                    {team.teamName}

                                </option>

                            ))

                        }

                    </select>

                    <br /><br />

                    <select
                        value={team2}
                        onChange={(e) => setTeam2(e.target.value)}
                    >

                        <option value="">Select Team 2</option>

                        {

                            teams.map((team) => (

                                <option
                                    key={team._id}
                                    value={team._id}
                                >

                                    {team.teamName}

                                </option>

                            ))

                        }

                    </select>

                    <br /><br />

                    <input
                        type="date"
                        value={matchDate}
                        onChange={(e) => setMatchDate(e.target.value)}
                    />

                    <br /><br />

                    <input
                        placeholder="Venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                    />

                    <br /><br />

                    <button onClick={addMatch}>

                        Create Match

                    </button>

                    <hr />

                    <h2>All Matches</h2>

                    <table
                        border="1"
                        cellPadding="10"
                    >

                        <thead>

                            <tr>

                                <th>Team 1</th>
                                <th>Team 2</th>
                                <th>Date</th>
                                <th>Venue</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                matches.map((match) => (

                                    <tr key={match._id}>

                                        <td>{match.team1?.teamName}</td>

                                        <td>{match.team2?.teamName}</td>

                                        <td>

                                            {

                                                new Date(match.matchDate)
                                                    .toLocaleDateString()

                                            }

                                        </td>

                                        <td>{match.venue}</td>

                                        <td>{match.status}</td>

                                        <td>

                                            <button
                                                onClick={() => deleteMatch(match._id)}
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Matches;