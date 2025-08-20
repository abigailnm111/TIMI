
import { baseURL } from '../routes.js';
export async function signUp(postData){
    const userId=await fetch(baseURL+'/signUp', {
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
        console.log('User created:', responseData.userId);
        return responseData.userId; // Return the userId for further use
    })
    .catch(error => {
        console.error('Error creating user:', error);
    });
    return userId; // Return the userId for further use
    }


export async function signIn(postData){  
    const userId=await fetch(baseURL+'/signIn', {
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
    console.log('User Logged In', responseData.userId);
    return responseData.userId; // Return the userId for further use

  })
  .catch(error => {
    console.error('Error creating user:', error);
  });
  return userId; // Return the userId for further use
  }