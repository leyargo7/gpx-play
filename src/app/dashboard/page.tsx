
"use client"
import { useSession, signOut } from "next-auth/react"
function Dashboard() {

    const { data: session, status } = useSession()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>hello</p>
      {
        status === "loading" && <p>Loading...</p>
      }
      {
        
        session && <p>{session.user?.email}</p> 
      }

      <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => signOut()}>Logout</button>
    </div>
  )
}

export default Dashboard