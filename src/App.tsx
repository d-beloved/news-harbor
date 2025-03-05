import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Settings from "./pages/Settings";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Header />
              <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/article/:id" element={<Article />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

export default App;
