import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "not authenticated ",
      },
      {
        status: 401,
      }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      {
        $match: { id: userId },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: { "messages.createdAt": -1 },
      },
      {
        $group: {
          _id: "$id",
          messages: { $push: "$messages" },
        },
      },

      //matched then unwind the messages i.e make multiple user objects with same id but different
      //messages then sorted them and again winded them
      //aka we just sorted the messages on the basis of their creation in above pipeline
    ]);
    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "user not found ",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
      {
        success: true,
        messages: user[0].messages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("failed to get messages");
    return Response.json(
      {
        success: false,
        message: "failed to get messages",
      },
      {
        status: 500,
      }
    );
  }
}
