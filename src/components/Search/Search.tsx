import { ChangeEventHandler, FormEventHandler } from "react";
import "./Search.css"

interface SearchProps {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    handleChange: ChangeEventHandler<HTMLInputElement>;
}
const Search: React.FC<SearchProps> = ({ handleSubmit, handleChange }) => {
    return (
        <div className="search-container">
            <h1 className="header">Web Dictionary</h1>

            <form action="" className="search-form" onSubmit={handleSubmit}>
                <input type="text" className="search-input" placeholder="Enter a word..." onChange={handleChange} />
                <button className="search-button" title="Search"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>)
}

export default Search;