import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    if (req.method === "GET") {
        const raioane = await prisma.$queryRaw`SELECT * FROM raion;`

        if (!raioane) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(raioane);
        return;
    }

    if (req.method === "POST") {
        const raionInfo = req.body;

        const raion = await prisma.$queryRaw`INSERT INTO raion (nume, tipRaion, idMagazin)
                                                VALUES (${raionInfo.nume}, ${raionInfo.tipRaion}, ${raionInfo.idMagazin});`

        if (!raion) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully created raion." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

