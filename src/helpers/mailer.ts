import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashes token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(Date.now() + 360000),
      });
      
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordExpire: hashedToken,
        forgotPasswordTokenExpiry: new Date(Date.now() + 360000),
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        //TODO and these credential to .env file
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOption = {
      from: "www.akshatagarwal@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify you email" : "Resent your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a>to${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }or copy and paste the link below in your browser. <br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailresponse = await transporter.sendMail(mailOption);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
