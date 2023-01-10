import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    const { id } = req.query;

    if (req.method === "GET") {

        const produs = await prisma.$queryRaw`SELECT * FROM produs WHERE id=${id};`

        if (!produs) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(produs[0]);
        return;
    }

    if (req.method === "PUT") {
        const produsInfo = req.body;

        const produs = await prisma.$queryRaw`UPDATE produs SET nume=${produsInfo.nume}, pret=${produsInfo.pret} WHERE id=${id};`

        if (!produs) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully updated produs." });
        return;
    }

    if (req.method === "DELETE") {

        const produs = await prisma.$queryRaw`DELETE FROM produs WHERE id=${id};`

        if (!produs) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully deleted produs." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

