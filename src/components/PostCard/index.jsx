import "./styles.css";

export const PostCard = ({ cover, title, body }) => {
  return (
    <div className="post">
      {console.log("Iniciando PostCard")}
      <img src={cover} alt="" />
      <div className="post-content">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
};
