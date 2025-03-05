import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
