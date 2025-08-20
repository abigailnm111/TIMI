export function Post({ post }) {
  return (
    <div className="post">
      <h2>{post?.title||"title"}</h2>
      <p>{post?.content ||"content"} </p>
      <span>Posted by {post?.author|| "author"}</span>
    </div>
  );
}