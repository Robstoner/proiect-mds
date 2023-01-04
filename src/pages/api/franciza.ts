import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    if (req.method === "GET") {
        const franciza = await prisma.$queryRaw`SELECT * FROM franciza;`

        if (!franciza) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(franciza);
        return;
    }

    if (req.method === "POST") {
        const francizaInfo = req.body;
        console.log(francizaInfo);

        const franciza = await prisma.$queryRaw`INSERT INTO franciza (locatie, numeDetinator)
                                                VALUES (${francizaInfo.locatie}, ${francizaInfo.numeDetinator});`

        if (!franciza) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully created campaign." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

