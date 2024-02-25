import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import "./SignUpPage.css";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await registerWithEmailAndPassword(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to register. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  return (
    <div className="sign-up-container">
      <Link
        to="/"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <img
          src="/logos/logo.png"
          alt="logo"
          height={60}
          style={{ cursor: "pointer" }}
        />
      </Link>
      <div className="auth">
        {error && <p className="error">{error}</p>}
        <div className="social-auth-buttons">
          <button onClick={handleGoogleSignIn}>
            <img alt="Google" src={iconsUrl + "google.svg"} height={30} />{" "}
            Register with Google
          </button>
        </div>
        <div className="separator">or</div>
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            alt="Toggle Password Visibility"
            src={
              iconsUrl + (isPasswordVisible ? "nonhidden.svg" : "hidden.svg")
            }
            height={15}
            onClick={togglePasswordVisibility}
            style={{
              cursor: "pointer",
              opacity: isPasswordVisible ? "1" : "0.3",
            }}
          />
        </div>
        <div className="submit-btn">
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}
