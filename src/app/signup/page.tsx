"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [button, setButton] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSignup() {
    try {
       
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      // const data =response.json();
      console.log(response.data);

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (
      (user.email,
      length > 0 && user.password.length > 0 && user.username.length > 0)
    ) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [user]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>{loading ? "processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          style={{
            padding: 10,
            textAlign: "center",
            borderRadius: "30px",
            marginTop: "10px",
          }}
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="username">username</label>
        <input
          style={{
            padding: 10,
            textAlign: "center",
            borderRadius: "30px",
            marginTop: "10px",
          }}
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">password</label>
        <input
          style={{
            padding: 10,
            textAlign: "center",
            borderRadius: "30px",
            marginTop: "10px",
          }}
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          style={{ padding: 10, marginTop: "10px", borderRadius: "20px" }}
          type="submit"
          onClick={onSignup}
        >
          {button ? "Signup" : "signup"}
        </button>
        <span>
          Already have account? <Link href={"/login"}>Login</Link>
        </span>
      </div>
    </>
  );
}
