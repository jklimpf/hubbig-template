import { NextRequest } from "next/server";
import prisma from "@/src/lib/prisma";
import { getAuthenticatedUser } from "@/src/lib/getAuthenticatedUser";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { error, user: authenticatedUser } = await getAuthenticatedUser();

    if (error || !authenticatedUser) {
      if (error) {
        return Response.json({ message: error });
      }
      return Response.json({ message: "Unauthorized" });
    }

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const currentPage = searchParams.get("currentPage");
    const itemsPerPage = searchParams.get("itemsPerPage");
    const searchTerm = searchParams.get("searchTerm");

    if (!currentPage || !itemsPerPage) {
      return Response.json({ message: "Wrong parameters" });
    }

    const whereObject: Prisma.ClientWhereInput = {
      ...(searchTerm && {
        OR: [
          {
            companyName: { contains: searchTerm },
          },
          { address: { contains: searchTerm } },
          { email: { contains: searchTerm } },
          { telephone: { contains: searchTerm } },
          { OIB: { contains: searchTerm } },
        ],
      }),
    };

    const clients = await prisma.client.findMany({
      where: whereObject,
      select: {
        id: true,
        companyName: true,
        email: true,
        telephone: true,
        address: true,
        OIB: true,
      },
      skip: (parseInt(currentPage) - 1) * parseInt(itemsPerPage),
      take: parseInt(itemsPerPage),
      orderBy: {
        createdAt: "desc",
      },
    });

    const count = await prisma.client.count({
      where: whereObject,
    });

    return Response.json({ clients, count });
  } catch (error) {
    return Response.json({ message: "Internal server error" });
  }
}
