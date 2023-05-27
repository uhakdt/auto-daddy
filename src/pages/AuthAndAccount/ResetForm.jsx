import React, { useState } from "react";
import { sendPasswordReset } from "../../firebase";

function ResetForm() {
  const [email, setEmail] = useState("");

  return (
    <>
      <input
        type="text"
        className="auth__textBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <button className="auth__btn" onClick={() => sendPasswordReset(email)}>
        Send password reset email
      </button>
    </>
  );
}

export default ResetForm;
