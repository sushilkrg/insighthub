import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request){
  await dbConnect();




  
  // here session not working
  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  console.log(session);
  console.log(user);

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }
}
