import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //check if user already exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User alresy exists" },
        { status: 400 }
      );
    }
    
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hassPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hassPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email

    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json(
      { message: "User created succesfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
