import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Settings from "./pages/Settings";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
