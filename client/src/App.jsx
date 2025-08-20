import { useState } from 'react'
import './App.css'
import { SignInPage } from './pages/signIn.jsx'
import { Feed } from './pages/feed.jsx'

function App() {
  const [user, setUser] = useState(null)



  return (
    <>
      {user===null&&<SignInPage setUser={setUser} />}
      {user!==null && <><h1>Welcome {user.username}</h1> <Feed/></>}


    </>
  )
}

export default App
