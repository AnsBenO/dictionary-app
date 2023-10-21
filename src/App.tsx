import { ChangeEventHandler, FormEventHandler, useState } from "react"
import "./App.css"
import Search from "./components/Search/Search"
import Word from "./components/Word/Word"
import { WordData } from "./types/WordData.type";
import { API_URL } from "./api";
import useLocalStorage from "use-local-storage";
import ToggleSwitch from "./components/ToggleSwitch/ToggleSwitch";


function App() {

  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [query, setQuery] = useState<string>("");
  const [wordData, setWordData] = useState<WordData[] | null>();
  const [loader, setLoader] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)

  }
  const onSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (query.trim().length !== 0) {
      setLoader(true);
      setSubmitted(false)
      const fetchData = async () => {
        try {
          const data = await fetch(`${API_URL}/${query}`);
          const response = await data.json() as WordData[];

          if ('title' in response && response.title === "No Definitions Found") {
            setWordData(null);
          } else {
            const results = response;
            setWordData(results);
          }
          setLoader(false);
          setSubmitted(true);
        } catch (error) {
          console.error(error);
          setLoader(false);
          setSubmitted(true);
          setWordData(null);
        }
      }
      void fetchData();
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    setQuery(searchValue);
  }
  return (
    <>
      <main data-theme={theme}>
        <ToggleSwitch theme={theme} switchTheme={switchTheme} />
        <Search handleSubmit={onSearch} handleChange={handleChange} />
        <div className="content">
          {loader && <div className="loader"></div>}
          {wordData ?
            wordData.map((word, index) => <Word key={index} {...word} />)
            : (submitted
              ? <div className="message"><i className="fa-solid fa-circle-exclamation"></i> No Definitions Found.</div> :
              (!loader
                ? <div className="message">Welcome to Web Dictionary!</div> : ''))
          }
        </div>
      </main>
    </>
  )
}

export default App
