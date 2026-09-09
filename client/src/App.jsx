import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Matches from "./pages/Matches";
import Scoreboard from "./pages/Scoreboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/teams"
                    element={
                        <ProtectedRoute>
                            <Teams />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/players"
                    element={
                        <ProtectedRoute>
                            <Players />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/matches"
                    element={
                        <ProtectedRoute>
                            <Matches />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/scoreboard"
                    element={
                        <ProtectedRoute>
                            <Scoreboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;