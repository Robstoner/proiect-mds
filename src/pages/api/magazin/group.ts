import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    // @ts-ignore: Unreachable code error
    BigInt.prototype.toJSON = function (): number {
        return Number(this);
    };

    if (req.method === "GET") {
        const magazine = await prisma.$queryRaw`select idFranciza, count(id) numar_magazine
                                                from magazin
                                                group by idFranciza
                                                having count(id) > 3;`

        if (!magazine) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(magazine);
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

