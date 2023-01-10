import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    const { id } = req.query;

    if (req.method === "GET") {

        const post = await prisma.$queryRaw`SELECT * FROM post WHERE id=${id};`

        if (!post) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(post[0]);
        return;
    }

    if (req.method === "PUT") {
        const postInfo = req.body;

        const post = await prisma.$queryRaw`UPDATE post SET titlu=${postInfo.titlu}, salariu=${postInfo.salariu}, programStart=${postInfo.programStart}, programFinal=${postInfo.programFinal} WHERE id=${id};`

        if (!post) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully updated post." });
        return;
    }

    if (req.method === "DELETE") {

        const post = await prisma.$queryRaw`DELETE FROM post WHERE id=${id};`

        if (!post) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully deleted post." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

