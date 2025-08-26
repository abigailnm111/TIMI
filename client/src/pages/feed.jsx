import { getPosts } from "../api/postsAPI";
import { Post } from "../components/post";

export function  Feed(){

    const posts=async ()=> await getPosts({user_id: 1});   
    
    //fix mapping posts 
    return (
        <div>
            <h1>Feed Page</h1>
            {posts.map(post=><Post post={post}/>)}
        </div>
    );
}