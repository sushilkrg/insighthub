import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { useParams } from "next/navigation";

export async function POST(request: Request) {
  await dbConnect();

  const { username, insightId, content } = await request.json();
  //   const {insightId} = useParams();

  try {
    const userData = await UserModel.findOne({ username }).exec();

    if (!userData) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // check if user is accepting messages
    // Function to check if a specific insight is accepting messages
    const isInsightAcceptingMessages = (): boolean | undefined => {
      // Find the specific insight by insightId
      const insight = userData.insights.find(
        (insight) => insight._id.toString() === insightId.toString()
      );

      if (!insight) {
        return undefined;
      }

      return insight.isAcceptingMessage;
    };

    const acceptingMessages = isInsightAcceptingMessages();
    if (!acceptingMessages) {
      return Response.json(
        { message: "User is not accepting messages", success: false },
        { status: 403 } // 403 Forbidden status
      );
    }

    const newMessage = { content, createdAt: new Date() };

    // Push the new message to the user's messages array
    const result = await UserModel.updateOne(
      { _id: userData._id, "insights._id": insightId }, // Find the user and the specific insight
      {
        $push: {
          "insights.$.messages": {
            newMessage,
          },
        },
      }
    );

    if (!result) {
      return Response.json(
        { message: "User is not accepting messages", success: false },
        { status: 403 } // 403 Forbidden status
      );
    }

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
