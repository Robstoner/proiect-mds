import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    if (req.method === "GET") {
        const oferte = await prisma.$queryRaw`SELECT * FROM oferta;`

        if (!oferte) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(oferte);
        return;
    }

    if (req.method === "POST") {
        const ofertaInfo = req.body;

        const oferta = await prisma.$queryRaw`INSERT INTO oferta (nume, dataInceput, dataFinal, procentajReducere)
                                                VALUES (${ofertaInfo.nume}, ${ofertaInfo.dataInceput}, ${ofertaInfo.dataFinal}, ${ofertaInfo.procentajReducere});`

        if (!oferta) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully created oferta." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

