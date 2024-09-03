"use client";

import axios from "axios";
import { log } from "console";
import { verify } from "crypto";
import Link from "next/link";
import React, { useState, useEffect, use } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verfied, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const VerifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      VerifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-4xl">Verify Email</h1>
      <h2>{token > "" ? `${token}` : "no token"}</h2>

      {verfied && (
        <div>
          <h1>Email verified</h1>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h1>error</h1>
        </div>
      )}
    </div>
  );
}
