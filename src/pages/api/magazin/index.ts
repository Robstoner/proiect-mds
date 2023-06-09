import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    if (req.method === "GET") {
        const magazine = await prisma.$queryRaw`SELECT * FROM magazin;`

        if (!magazine) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(magazine);
        return;
    }

    if (req.method === "POST") {
        const magazinInfo = req.body;

        const magazin = await prisma.$queryRaw`INSERT INTO magazin (adresa, programStart, programFinal, dataDeschiderii, idFranciza)
                                                VALUES (${magazinInfo.adresa}, ${magazinInfo.programStart}, ${magazinInfo.programFinal}, ${magazinInfo.dataDeschiderii}, ${magazinInfo.idFranciza});`

        if (!magazin) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully created magazin." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

