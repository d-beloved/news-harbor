import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persister, store } from "./store";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import Header from "./components/layout/header/Header";
import { Footer } from "./components/layout/footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { ArticlesProvider } from "./context/ArticlesContext";
import Home from "./pages/Home";
import { ScrollToTop } from "./components/common/ScrollToTop";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <ArticlesProvider>
            <ErrorBoundary>
              <div className="min-h-screen bg-gradient-to-br from-accent/20 via-primary/20 to-secondary/10 flex flex-col transition-colors duration-50">
                <Header />
                <main className="flex-grow container max-w-7xl w-full mx-auto px-4 py-6 animate-fade-in">
                  <Home />
                </main>
                <Footer />
                <ScrollToTop />
              </div>
            </ErrorBoundary>
          </ArticlesProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
