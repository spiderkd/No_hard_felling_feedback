import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 500,
        }
      );
    }

    const isValidCode = user.verifyCode === code;

    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeNotExpired && isValidCode) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "user now verified ",
        },
        {
          status: 200,
        }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "verification  code has expired,please signup again to get new code ",
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "incorrect verification code ",
        },
        {
          status: 400,
        }
      );
    }
  } catch (err) {
    console.error("error verifying user", err);
    return Response.json(
      {
        success: false,
        message: "error verifying use",
      },
      {
        status: 500,
      }
    );
  }
}
