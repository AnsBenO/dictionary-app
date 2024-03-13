import "./App.css"

import useLocalStorage from "use-local-storage";
import ToggleSwitch from "./app-components/ToggleSwitch/ToggleSwitch";
import Navigation from "./app-components/Navigation/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./app-components/Loader/Loader";


const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const SavedDefinitionsContainer = lazy(() => import("./pages/SavedDefinitions/SavedDefinitions"));

function App() {

  const [theme, setTheme] = useLocalStorage('theme', 'light');


  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)

  }

  return (
    <>
      <BrowserRouter basename="/dictionary-app">
        <main data-theme={theme}>

          <header>
            <ToggleSwitch theme={theme} switchTheme={switchTheme} />
            <Navigation />
          </header>
          <Suspense fallback={<div><Loader /></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:word" element={<Home />} />
              <Route path="/saved-definitions" element={<SavedDefinitionsContainer />} />
              <Route path="/about" element={<About />} />

            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
