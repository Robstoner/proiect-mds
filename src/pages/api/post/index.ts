import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    if (req.method === "GET") {
        const posturi = await prisma.$queryRaw`SELECT * FROM post;`

        if (!posturi) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(posturi);
        return;
    }

    if (req.method === "POST") {
        const postInfo = req.body;

        const post = await prisma.$queryRaw`INSERT INTO post (titlu, salariu, programStart, programFinal)
                                                VALUES (${postInfo.titlu}, ${postInfo.salariu}, ${postInfo.programStart}, ${postInfo.programFinal});`

        if (!post) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully created post." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

