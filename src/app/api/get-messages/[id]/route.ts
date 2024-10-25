import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }
  const userId = new mongoose.Types.ObjectId(_user._id);

  try {
    const userData: any = await UserModel.findById(userId);
    const url: any = request.url;
    const id = url.split("/")[5];

    // get latest messages from a specific insight
    const getLatestMessages = (): any => {
      // Find the specific insight by insightId
      const insight = userData.insights.find(
        (insight: any) => insight._id.toString() === id.toString()
      );

      if (!insight) {
        return undefined;
      }

      const sortedMessages = insight.messages.sort(
        (a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime()
      );

      return sortedMessages;
    };

    const latestMessages = getLatestMessages();

    if (!latestMessages || latestMessages.length === 0) {
      return Response.json(
        { message: "Message not found", success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: latestMessages },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return Response.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
