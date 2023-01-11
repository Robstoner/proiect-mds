import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    if (req.method === "GET") {
        const contracte = await prisma.$queryRaw`SELECT * FROM contract;`

        if (!contracte) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(contracte);
        return;
    }

    if (req.method === "POST") {
        const contractInfo = req.body;

        const contract = await prisma.$queryRaw`INSERT INTO contract (dataInceput, dataFinal, idAngajat, idPost, idMagazin)
                                                VALUES (${contractInfo.dataInceput}, ${contractInfo.dataFinal}, ${contractInfo.idAngajat}, ${contractInfo.idPost}, ${contractInfo.idMagazin});`

        if (!contract) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully created contract." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

