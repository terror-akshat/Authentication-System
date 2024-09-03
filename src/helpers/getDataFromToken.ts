import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { request } from "http";

export const getDataToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const data: any = jwt.verify(token, process.env.TOKEN_SECURET!);
    console.log(data.id);
  
    return data.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
