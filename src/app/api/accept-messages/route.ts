import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel, { Insight, User } from "@/model/User";
import { ObjectId } from "mongoose";
import { useParams } from "next/navigation";

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
    // const getInsightById = (
    //   userData: User,
    //   insightId: ObjectId | string
    // ): Insight | undefined => {
    //   // Convert insightId to string if needed for comparison
    //   return userData?.insights.find(
    //     (insight) => insight._id.toString() === insightId.toString()
    //   );
    // };
    const { insightId }: any = request.json();
    const userData: any = await UserModel.findById(userId);
    // const insight = getInsightById(userData, insightId);

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
        result,
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

export async function GET(request: Request) {
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
      // Convert insightId to string if needed for comparison
      return userData?.insights.find(
        (insight) => insight._id.toString() === insightId.toString()
      );
    };

    // --------check here ------------

    
    // const { insightId }: any = request.json();
    const { insightId }: any = useParams();
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
        isAcceptingMessage: insight?.isAcceptingMessage,
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
