import "./styles.css";

export const ChangePageButton = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className="change-page-button">
      {text} {console.log("Iniciando Change Page Button")}
    </button>
  );
};
