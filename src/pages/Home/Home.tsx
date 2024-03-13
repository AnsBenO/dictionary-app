import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import "./Home.css";

import { WordData } from "../../types/WordData.type";
import { API_URL } from "../../api";
import Search from "./components/Search/Search";
import Word from "./components/Word/Word";
import Loader from "../../app-components/Loader/Loader";

function Home() {
  const [query, setQuery] = useState<string>("");
  const [wordData, setWordData] = useState<WordData[] | null>();
  const [loader, setLoader] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const queryParams = new URLSearchParams(location.search);
  const pathWord = queryParams.get("word");
  useEffect(() => {
    if (pathWord) {
      void fetchData(pathWord);
    }
  }, [pathWord]);

  const fetchData = async (searchValue: string) => {
    try {
      setLoader(true);
      setSubmitted(false);
      const data = await fetch(`${API_URL}/${searchValue}`);
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
  };

  const onSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (query.trim().length !== 0) {
      void fetchData(query);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
  };

  return (
    <>
      <Search handleSubmit={onSearch} handleChange={handleChange} />
      <div className="content">
        {loader && <Loader />}
        {wordData ? (
          <Word definitionsData={wordData} />
        ) : submitted ? (
          <div className="message"><i className="fa-solid fa-circle-exclamation"></i> No Definitions Found.</div>
        ) : !loader ? (
          <div className="message">Welcome to Web Dictionary!</div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Home;
