import { ChangeEventHandler, FormEventHandler } from "react";
import "./Search.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    handleChange: ChangeEventHandler<HTMLInputElement>;
}
const Search: React.FC<SearchProps> = ({ handleSubmit, handleChange }) => {
    return (
        <div className="search-container">
            <h1 className="header">Web Dictionary</h1>

            <form action="" className="search-form" onSubmit={handleSubmit}>
                <input type="text" className="search-form-input" placeholder="Enter a word..." onChange={handleChange} />
                <button className="search-button" title="Search">
                    <FontAwesomeIcon className="search-icon" icon={faSearch} ></FontAwesomeIcon>
                </button>
            </form>
        </div>)
}

export default Search;