import { signIn, signUp } from '../api/signInUpAPI'


export function SignInPage({setUser}){
    //add valudation for email, password, username

const signUpInWithValues=async (userAction)=> {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const userId=await userAction({email, password, username});
    setUser({username, userId: userId});
}
return (
    <>
    <h3>SignIn/SignUp</h3>
    <label htmlFor="email">Email:</label>
    <input type="text" id="email"></input>
    <label htmlFor="username">Username:</label>
    <input type="text" id="username"></input>
    <label htmlFor="password">Password:</label>
    <input type="password" id="password"></input>
    <button id="signUp" onClick={()=> signUpInWithValues(signUp)}>Sign Up</button>
    <button id="signIn" onClick={()=>signUpInWithValues(signIn)}>Sign In</button></>)}