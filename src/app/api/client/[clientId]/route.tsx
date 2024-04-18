import { NextRequest } from "next/server";
import prisma from "@/src/lib/prisma";
import { getAuthenticatedUser } from "@/src/lib/getAuthenticatedUser";

export async function GET(
  req: NextRequest,
  { params }: { params: { clientId: string } }
) {
  try {
    const { error, user: authenticatedUser } = await getAuthenticatedUser();

    if (error || !authenticatedUser) {
      if (error) {
        return Response.json({ message: error });
      }
      return Response.json({ message: "Unauthorized" });
    }

    const clientId = params.clientId;

    if (!clientId) {
      return Response.json({ message: "Wrong parameters" });
    }

    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    return Response.json({ client });
  } catch (error) {
    return Response.json({ message: "Internal server error" });
  }
}
