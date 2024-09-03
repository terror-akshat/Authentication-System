"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ProfilePAge() {
  const [data, setData] = useState("nothing");
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout successfull");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDeatils = async () => {
    try {
      const res = await axios.get("/api/users/me");
      // console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.error(
        "Error fetching user details:",
        error.response?.data?.messagFe
      );
    }
  };
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <h1>profile page</h1>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button onClick={logout}>Logout</button>
      <button onClick={getUserDeatils}>Detals</button>
    </div>
  );
}
