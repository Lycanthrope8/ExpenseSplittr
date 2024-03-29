import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div className="w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-70%]">
    {/* <div className="h-screen grid place-items-center"> */}
    <form className="flex flex-col items-center w-3/12 h-max justify-center px-4 py-8 bg-transparent border-2 border-border text-text mx-auto rounded-lg" onSubmit={handleSubmit}>
      <h3 className="text-4xl mb-24">Sign Up</h3>
      
      <div className="space-y-2 w-full mb-12">
        <label className="block text-xl ml-0">Email:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
          // placeholder="Email"
          className="block w-full bg-transparent border-2 border-border rounded-lg p-2"
        />
      </div>
      <div className="space-y-2 w-full mb-8">
        <label className="block text-xl ml-0">Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
          // placeholder="Password"
          className="block w-full bg-transparent border-2 border-border rounded-lg p-2"
        />
      </div>

      <button className="mt-2 p-2 bg-transparent border-2 border-border rounded-lg w-full hover:bg-secondary/40 transition-colors" disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default Signup