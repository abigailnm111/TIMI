import { useState, useEffect } from "react";
import { getPosts } from "../api/postsAPI";
import { Post } from "../components/post";

export function  Feed({user_id}){
    console.log("User ID in Feed:", user_id);
    const [posts, setPosts]=useState([]);

    useEffect(
        ()=> {
            const callPosts=async()=>{const fetchedPosts= await getPosts({user_id});
            setPosts(fetchedPosts)}
            callPosts();
        },
            [])
    
    //fix mapping posts 
    return (
        <div>
            <h1>Feed Page</h1>
            {posts.map(post=><Post post={post}/>)}
        </div>
    );
}