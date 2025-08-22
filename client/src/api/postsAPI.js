
import { baseURL } from '../routes.js';
export async function getPosts(postData){
    const posts=await fetch(baseURL+'/getPost', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData) // Convert JavaScript object to JSON string
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        console.log('Got Posts');
        return responseData.posts; 
    })
    .catch(error => {
        console.error('Error creating user:', error);
    });
    return posts;
    }


export async function createPost(postData){  
    const postId=await fetch(baseURL+'/createPost', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(postData) // Convert JavaScript object to JSON string
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(responseData => {
    return responseData.postId; // Return the postId for further use

  })
  .catch(error => {
    console.error('Error creating user:', error);
  });
  return postId; // Return the postId for further use
  }