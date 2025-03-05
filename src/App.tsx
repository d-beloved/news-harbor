import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

const Home = lazy(() => import("./pages/Home"));
const Article = lazy(() => import("./pages/Article"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Header />
              <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
                <Suspense
                  fallback={
                    <div className="loading loading-spinner loading-lg"></div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </Suspense>
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
