import axios from 'axios'
import React, { useState,useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {AuthContext} from '../helpers/AuthContext'

const Login = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    //const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", { username: username, password: password }).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
         history.push("/posts");
      }
    });
   
  };
    return (
        <div>
            <form>
                <label htmlFor="username" className="block mb-2 text-sm text-gray-600 dark:text-gray-400 mt-4">Username </label>
                <input type="text" onChange={e => setUsername(e.target.value)} value={username} autoComplete="off" className="w-full px-3 py-2 mb-4 bg-white placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 break-all" name="username" placeholder="Enter your username.." />
                <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-400 mt-4">Password </label>
                <input type="password" onChange={e => setPassword(e.target.value)} value={password} autoComplete="off" className="w-full px-3 py-2 mb-4 bg-white placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 break-all" name="password" placeholder="Enter your username.." />
                <button onClick={login} type="submit" className="px-4 py-2 font-bold text-white bg-indigo-400 hover:bg-indigo-600 rounded-md focus:bg-indigo-600 focus:outline-none">Login</button>
            </form>

        </div>
    )
}

export default Login
