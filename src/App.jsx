import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Saved from "./pages/Saved.jsx";

function App() {
  return (
    <div className="bg-blue-200">
      <h1 className="text-center font-bold p-1">Just-Search-It</h1>
      <nav className="p-4 bg-blue-400 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/saved">Saved</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </div>
  );
}

export default App;
