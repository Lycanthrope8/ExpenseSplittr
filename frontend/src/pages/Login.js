import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login flex flex-col items-center justify-center min-h-full px-4 py-8 bg-secondary-dark-bg w-1/4 mx-auto" onSubmit={handleSubmit}>
      <h3 className="text-zinc-100 text-4xl mb-12">Log In</h3>

      <div className="flex justify-evenly mb-4 w-full">
        <label className="flex items-center text-zinc-100 text-xl ml-0">Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 w-3/4"
        />
      </div>
      <div className="flex justify-evenly mb-4 w-full">
        <label className="flex items-center text-zinc-100 text-xl ml-0">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 w-3/4"
        />
      </div>

      <button disabled={isLoading}>Log in</button>
        {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
