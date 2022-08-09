import { PostCard } from "../PostCard";
import "./styles.css";

export const PostsContainer = ({ posts }) => {
  return (
    <div className="posts">
      {console.log("Iniciando PostsContainer", posts)}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          cover={post.cover}
          body={post.body}
          title={post.title}
        />
      ))}
    </div>
  );
};
