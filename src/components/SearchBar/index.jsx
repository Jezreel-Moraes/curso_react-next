import "./styles.css";

export const SearchBar = ({ handleChange, searchValue, placeholder = "" }) => {
  return (
    <input
      className="search-bar"
      placeholder={placeholder}
      type="search"
      onChange={handleChange}
      value={searchValue}
      maxLength="40"
    />
  );
};
