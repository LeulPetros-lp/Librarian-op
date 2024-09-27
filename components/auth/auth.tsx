import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";

interface AuthProps {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({ isAuth, setIsAuth }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    // axios.post("http://localhost:5123/login", {
    //   username,
    //   password,
    // }).then((response) => {
    //   console.log(response);
    // }).catch((error) => {
    //   console.error("Error logging in:", error);
    // });
    setIsAuth(true)
  };
  

  return (
    <div>
      {/* Authentication UI */}
{/* 
      <h1 className='bg-gradient-to-r from-danger to-primary bg-clip-text text-transparent text-3xl font-bold mb-10'>Login </h1> */}
      <div>
        <Input
          placeholder="Username"
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          type="name"
          style={{ width: 300 }}
        />
        <br />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          style={{ width: 300 }}
        />

        <div className="w-full mt-5">
          <Button className="w-full" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
