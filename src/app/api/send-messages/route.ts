import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, insightId, content } = await request.json();

  try {
    const userData = await UserModel.findOne({ username }).exec();

    if (!userData) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isInsightAcceptingMessages = (): any => {
      // Find the specific insight by insightId
      const insight = userData.insights.find(
        (insight) => insight._id.toString() === insightId.toString()
      );

      if (!insight) {
        return undefined;
      }

      return insight?.isAcceptingMessage;
    };

    const acceptingMessages = isInsightAcceptingMessages();
    if (!acceptingMessages) {
      return Response.json(
        { message: "User is not accepting messages", success: false },
        { status: 403 } // 403 Forbidden status
      );
    }

    // Push the new message to the user's messages array
    const result = await UserModel.updateOne(
      { _id: userData._id, "insights._id": insightId }, // Find the user and the specific insight
      {
        $push: {
          "insights.$.messages": {
            content,
          },
        },
      }
    );

    return Response.json(
      { message: "Message sent successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in adding messages:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
