'use client'

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import styles from "./Login.module.css"; // Import CSS module styles

function Login(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="register-container">
        <div className="form-container">
      <h2 className="register" >Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label  className="input-label" htmlFor="email">Email:</label>
          <input className="input-area"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={handleEmailChange}
          
          />
        </div>
        <div className="input-field">
          <label  className="input-label" htmlFor="password">Password:</label>
          <input  className="input-area"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={handlePasswordChange}
        
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        <div className="btn-container">
        <button type="submit"  className="register-btn" >Login</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Login;