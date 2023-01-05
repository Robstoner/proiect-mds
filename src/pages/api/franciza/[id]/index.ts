import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    const { id } = req.query;

    if (req.method === "GET") {

        const franciza = await prisma.$queryRaw`SELECT * FROM franciza WHERE id=${id};`

        if (!franciza) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(franciza[0]);
        return;
    }

    if (req.method === "PUT") {
        const francizaInfo = req.body;

        const franciza = await prisma.$queryRaw`UPDATE franciza SET locatie=${francizaInfo.locatie}, numeDetinator=${francizaInfo.numeDetinator} WHERE id=${id};`

        if (!franciza) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully updated franciza." });
        return;
    }

    if (req.method === "DELETE") {
        const francizaInfo = req.body;

        const franciza = await prisma.$queryRaw`DELETE FROM franciza WHERE id=${id};`

        if (!franciza) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully deleted franciza." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

