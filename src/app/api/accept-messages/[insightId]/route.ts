import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel, { Insight, User } from "@/model/User";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user?._id;
  const { acceptMessages } = await request.json();

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  try {
    const url: any = request.url;
    const insightId: any = url?.match(/\/accept-messages\/([^/]+)/)[1];

    const result = await UserModel.updateOne(
      { _id: userId, "insights._id": insightId }, // Find the user and the specific insight
      {
        $set: { "insights.$.isAcceptingMessage": acceptMessages }, // Use $ to update the specific insight
      },
      { new: true }
    );

    if (!result) {
      return Response.json(
        {
          success: false,
          message:
            "Unable to find user insight to update message acceptance status",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
        // result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error retrieving insight's message acceptance status",
      error
    );
    return Response.json(
      { success: false, message: "Error retrieving message acceptance status" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user?._id;

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  try {
    const getInsightById = (
      userData: User,
      insightId: ObjectId | string
    ): Insight | undefined => {
      return userData?.insights.find(
        (insight) => insight._id.toString() === insightId.toString()
      );
    };

    const url: any = request.url;
    const insightId: any = url?.match(/\/accept-messages\/([^/]+)/)[1];

    const userData: any = await UserModel.findById(userId);
    const insight = getInsightById(userData, insightId);

    if (!insight) {
      return Response.json(
        {
          success: false,
          message: "Insight not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        // isAcceptingMessage: insight?.isAcceptingMessage,
        insight: insight,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error retrieving insight's message acceptance status",
      error
    );
    return Response.json(
      { success: false, message: "Error retrieving message acceptance status" },
      { status: 500 }
    );
  }
}
