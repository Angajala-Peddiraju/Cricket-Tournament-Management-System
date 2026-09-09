import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Scoreboard() {

    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);

    const [selectedMatch, setSelectedMatch] = useState("");

    const [scoreboard, setScoreboard] = useState(null);

    const [batsmanId, setBatsmanId] = useState("");

    const [bowlerId, setBowlerId] = useState("");

    // -----------------------------
    // React 19 Safe useEffect
    // -----------------------------

    useEffect(() => {

        const loadData = async () => {

            try {

                const matchResponse = await api.get("/matches");

                setMatches(matchResponse.data.matches);

                const playerResponse = await api.get("/players");

                setPlayers(playerResponse.data.players);

            }

            catch (error) {

                console.log(error);

            }

        };

        loadData();

    }, []);

    // -----------------------------
    // Load Scoreboard
    // -----------------------------

    const loadScoreboard = async (matchId) => {

        try {

            const response = await api.get(

                `/scoreboard/${matchId}`

            );

            setScoreboard(response.data.scoreboard);

        }

        catch (error) {

            console.log(error);

        }

    };

    // -----------------------------
    // Update Score
    // -----------------------------

    const updateScore = async (runs, wicket = false) => {

        if (!selectedMatch) {

            alert("Select Match");

            return;

        }

        if (!batsmanId) {

            alert("Select Batsman");

            return;

        }

        if (!bowlerId) {

            alert("Select Bowler");

            return;

        }

        try {

            await api.put(

                `/scoreboard/${selectedMatch}`,

                {

                    runs,

                    wicket,

                    batsmanId,

                    bowlerId

                }

            );

            loadScoreboard(selectedMatch);

        }

        catch (error) {

            console.log(error);

        }

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

                    <h1>Live Scoreboard</h1>

                    <br />

                    <h3>Select Match</h3>

                    <select

                        value={selectedMatch}

                        onChange={(e) => {

                            setSelectedMatch(e.target.value);

                            loadScoreboard(e.target.value);

                        }}

                    >

                        <option value="">

                            Select Match

                        </option>

                        {

                            matches.map((match) => (

                                <option

                                    key={match._id}

                                    value={match._id}

                                >

                                    {match.team1?.teamName}

                                    {" vs "}

                                    {match.team2?.teamName}

                                </option>

                            ))

                        }

                    </select>

                    <br /><br />

                    <h3>Select Batsman</h3>

                    <select

                        value={batsmanId}

                        onChange={(e) =>

                            setBatsmanId(e.target.value)

                        }

                    >

                        <option value="">

                            Select Batsman

                        </option>

                        {

                            players.map((player) => (

                                <option

                                    key={player._id}

                                    value={player._id}

                                >

                                    {player.name}

                                </option>

                            ))

                        }

                    </select>

                    <br /><br />

                    <h3>Select Bowler</h3>

                    <select

                        value={bowlerId}

                        onChange={(e) =>

                            setBowlerId(e.target.value)

                        }

                    >

                        <option value="">

                            Select Bowler

                        </option>

                        {

                            players.map((player) => (

                                <option

                                    key={player._id}

                                    value={player._id}

                                >

                                    {player.name}

                                </option>

                            ))

                        }

                    </select>

                    <hr />

                    {

                        scoreboard && (

                            <div>

                                <h2>

                                    Score :

                                    {" "}

                                    {scoreboard.runs}

                                    /

                                    {scoreboard.wickets}

                                </h2>

                                <h3>

                                    Overs :

                                    {" "}

                                    {scoreboard.overs}

                                    .

                                    {scoreboard.balls}

                                </h3>

                            </div>

                        )

                    }

                    <hr />

                    <h2>Runs</h2>

                    <button onClick={() => updateScore(0)}>

                        0

                    </button>

                    {" "}

                    <button onClick={() => updateScore(1)}>

                        1

                    </button>

                    {" "}

                    <button onClick={() => updateScore(2)}>

                        2

                    </button>

                    {" "}

                    <button onClick={() => updateScore(3)}>

                        3

                    </button>

                    {" "}

                    <button onClick={() => updateScore(4)}>

                        4

                    </button>

                    {" "}

                    <button onClick={() => updateScore(6)}>

                        6

                    </button>

                    {" "}

                    <button

                        style={{

                            backgroundColor: "red",

                            color: "white"

                        }}

                        onClick={() =>

                            updateScore(0, true)

                        }

                    >

                        WICKET

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Scoreboard;
