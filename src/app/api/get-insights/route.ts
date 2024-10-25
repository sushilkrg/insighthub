import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";

export async function GET(request: Request) {
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

    return Response.json(
      {
        success: true,
        insightsData: userData.insights,
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
