import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Players() {

    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [jerseyNumber, setJerseyNumber] = useState("");
    const [role, setRole] = useState("");
    const [battingStyle, setBattingStyle] = useState("");
    const [bowlingStyle, setBowlingStyle] = useState("");
    const [team, setTeam] = useState("");

    const [editingId, setEditingId] = useState(null);

    // =====================================
    // Load Players & Teams (React 19 Safe)
    // =====================================

    useEffect(() => {

        const loadData = async () => {

            try {

                const playerResponse = await api.get("/players");

                setPlayers(playerResponse.data.players);

                const teamResponse = await api.get("/teams");

                setTeams(teamResponse.data.teams);

            } catch (error) {

                console.log(error);

            }

        };

        loadData();

    }, []);

    // =====================================
    // Fetch Players
    // =====================================

    const fetchPlayers = async () => {

        try {

            const response = await api.get("/players");

            setPlayers(response.data.players);

        } catch (error) {

            console.log(error);

        }

    };

    // =====================================
    // Add Player
    // =====================================

    const addPlayer = async () => {

        try {

            await api.post("/players", {

                name,
                age,
                jerseyNumber,
                role,
                battingStyle,
                bowlingStyle,
                team

            });

            alert("Player Added Successfully");

            clearForm();

            fetchPlayers();

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Failed to Add Player"

            );

        }

    };

    // =====================================
    // Edit Player
    // =====================================

    const editPlayer = (player) => {

        setEditingId(player._id);

        setName(player.name);
        setAge(player.age);
        setJerseyNumber(player.jerseyNumber);
        setRole(player.role);
        setBattingStyle(player.battingStyle);
        setBowlingStyle(player.bowlingStyle);
        setTeam(player.team?._id);

    };

    // =====================================
    // Update Player
    // =====================================

    const updatePlayer = async () => {

        try {

            await api.put(

                `/players/${editingId}`,

                {

                    name,
                    age,
                    jerseyNumber,
                    role,
                    battingStyle,
                    bowlingStyle,
                    team

                }

            );

            alert("Player Updated Successfully");

            clearForm();

            fetchPlayers();

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Failed To Update Player"

            );

        }

    };

    // =====================================
    // Delete Player
    // =====================================

    const deletePlayer = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this Player?"

        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/players/${id}`);

            alert("Player Deleted Successfully");

            fetchPlayers();

        } catch (error) {

            console.log(error);

        }

    };

    // =====================================
    // Clear Form
    // =====================================

    const clearForm = () => {

        setEditingId(null);

        setName("");
        setAge("");
        setJerseyNumber("");
        setRole("");
        setBattingStyle("");
        setBowlingStyle("");
        setTeam("");

    };
        return (

        <div>

            <Navbar />

            <div
                style={{
                    display: "flex"
                }}
            >

                <Sidebar />

                <div
                    style={{
                        padding: "30px",
                        width: "100%"
                    }}
                >

                    <h1>Players</h1>

                    <br />

                    <input
                        type="text"
                        placeholder="Player Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="number"
                        placeholder="Jersey Number"
                        value={jerseyNumber}
                        onChange={(e) => setJerseyNumber(e.target.value)}
                    />

                    <br /><br />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >

                        <option value="">Select Role</option>

                        <option value="Batsman">Batsman</option>

                        <option value="Bowler">Bowler</option>

                        <option value="All-Rounder">All-Rounder</option>

                        <option value="Wicket Keeper">Wicket Keeper</option>

                    </select>

                    <br /><br />

                    <input
                        type="text"
                        placeholder="Batting Style"
                        value={battingStyle}
                        onChange={(e) => setBattingStyle(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="text"
                        placeholder="Bowling Style"
                        value={bowlingStyle}
                        onChange={(e) => setBowlingStyle(e.target.value)}
                    />

                    <br /><br />

                    <select
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                    >

                        <option value="">Select Team</option>

                        {

                            teams.map((teamItem) => (

                                <option
                                    key={teamItem._id}
                                    value={teamItem._id}
                                >

                                    {teamItem.teamName}

                                </option>

                            ))

                        }

                    </select>

                    <br /><br />

                    {

                        editingId ?

                        <button onClick={updatePlayer}>

                            Update Player

                        </button>

                        :

                        <button onClick={addPlayer}>

                            Add Player

                        </button>

                    }

                    {

                        editingId &&

                        <button
                            style={{
                                marginLeft: "10px"
                            }}
                            onClick={clearForm}
                        >

                            Cancel

                        </button>

                    }

                    <hr />

                    <h2>All Players</h2>

                    <table
                        border="1"
                        cellPadding="10"
                        style={{
                            width: "100%",
                            textAlign: "center"
                        }}
                    >

                        <thead>

                            <tr>

                                <th>Name</th>
                                <th>Age</th>
                                <th>Jersey</th>
                                <th>Role</th>
                                <th>Batting</th>
                                <th>Bowling</th>
                                <th>Team</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                players.length > 0 ?

                                players.map((player) => (

                                    <tr key={player._id}>

                                        <td>{player.name}</td>

                                        <td>{player.age}</td>

                                        <td>{player.jerseyNumber}</td>

                                        <td>{player.role}</td>

                                        <td>{player.battingStyle}</td>

                                        <td>{player.bowlingStyle}</td>

                                        <td>{player.team?.teamName}</td>

                                        <td>

                                            <button
                                                onClick={() => editPlayer(player)}
                                            >

                                                Edit

                                            </button>

                                            {" "}

                                            <button
                                                onClick={() => deletePlayer(player._id)}
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td colSpan="8">

                                        No Players Found

                                    </td>

                                </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Players;