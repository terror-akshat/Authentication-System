"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [button, setButton] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onLinup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successfull");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
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
        <h1>{loading ? "Processing" : "Login"}</h1>
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
          onClick={onLinup}
        >
          Signup here
        </button>
        <span>
          Don't have any account? <Link href={"/signup"}>Signup</Link>
        </span>
      </div>
    </>
  );
}
