import "./Search.css"

interface SearchProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Search: React.FC<SearchProps> = ({ handleSubmit, handleChange }) => {
    return (
        <div className="search-container">
            <h1 className="header">Web Dictionary</h1>

            <form action="" className="search-form" onSubmit={handleSubmit}>
                <input type="text" className="search-input" placeholder="Enter a word..." onChange={handleChange} />
                <button className="search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>)
}

export default Search;