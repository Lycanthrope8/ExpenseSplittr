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
    <form className="signup flex flex-col items-center justify-center min-h-full px-4 py-8 bg-secondary-dark-bg w-1/4 mx-auto rounded-2xl" onSubmit={handleSubmit}>
      <h3 className="text-zinc-100 text-4xl mb-12">Sign Up</h3>
      
      <div className="space-y-2 w-full mb-8">
        <label className="block text-zinc-100 text-xl ml-0">Email:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
          className="block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
        />
      </div>
      <div className="space-y-2 w-full mb-8">
        <label className="block text-zinc-100 text-xl ml-0">Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          className="block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
        />
      </div>

      <button className="mt-2 p-2 bg-accent text-zinc-800 rounded-2xl w-full hover:bg-half-transparent" disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup