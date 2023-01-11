import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    if (req.method === "GET") {
        const produse = await prisma.$queryRaw`SELECT * FROM produs;`

        if (!produse) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(produse);
        return;
    }

    if (req.method === "POST") {
        const produsInfo = req.body;

        const produs = await prisma.$queryRaw`INSERT INTO produs (nume, pret)
                                                VALUES (${produsInfo.nume}, ${produsInfo.pret});`

        if (!produs) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully created produs." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

