import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel, { Insight } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { tag, question } = await request.json();

  try {
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const newInsight = { tag, question, createdAt: new Date() };
    userData.insights.push(newInsight as Insight);
    await userData.save();

    return Response.json(
      {
        success: true,
        message: " Insight created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating insight:", error);
    return Response.json(
      {
        success: false,
        message: "Error creating insight",
      },
      { status: 500 }
    );
  }
}
