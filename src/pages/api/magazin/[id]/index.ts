import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    const { id } = req.query;

    if (req.method === "GET") {

        const magazin = await prisma.$queryRaw`SELECT * FROM magazin WHERE id=${id};`

        if (!magazin) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(magazin[0]);
        return;
    }

    if (req.method === "PUT") {
        const magazinInfo = req.body;
console.log(magazinInfo);
        const magazin = await prisma.$queryRaw`UPDATE magazin SET adresa=${magazinInfo.adresa}, programStart=${magazinInfo.programStart}, programFinal=${magazinInfo.programFinal},
                                                                    dataDeschiderii=${magazinInfo.dataDeschiderii}, idFranciza=${magazinInfo.idFranciza} WHERE id=${id};`

        if (!magazin) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully updated magazin." });
        return;
    }

    if (req.method === "DELETE") {
        const magazinInfo = req.body;

        const magazin = await prisma.$queryRaw`DELETE FROM magazin WHERE id=${id};`

        if (!magazin) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully deleted magazin." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

