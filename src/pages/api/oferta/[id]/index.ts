import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    const { id } = req.query;

    if (req.method === "GET") {

        const oferta = await prisma.$queryRaw`SELECT * FROM oferta WHERE id=${id};`

        if (!oferta) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(oferta[0]);
        return;
    }

    if (req.method === "PUT") {
        const ofertaInfo = req.body;

        const oferta = await prisma.$queryRaw`UPDATE oferta SET nume=${ofertaInfo.nume}, dataInceput=${ofertaInfo.dataInceput}, dataFinal=${ofertaInfo.dataFinal}, procentajReducere=${ofertaInfo.procentajReducere} WHERE id=${id};`

        if (!oferta) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully updated oferta." });
        return;
    }

    if (req.method === "DELETE") {

        const oferta = await prisma.$queryRaw`DELETE FROM oferta WHERE id=${id};`

        if (!oferta) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully deleted oferta." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

