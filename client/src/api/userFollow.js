import { baseURL } from '../routes.js';

//body contains: user_id, follower_id
export async function followUser(postData){  
    await fetch(baseURL+'/followUser', {
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
  }