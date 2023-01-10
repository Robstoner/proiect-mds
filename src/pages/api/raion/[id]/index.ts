import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    const { id } = req.query;

    if (req.method === "GET") {

        const raion = await prisma.$queryRaw`SELECT * FROM raion WHERE id=${id};`

        if (!raion) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(raion[0]);
        return;
    }

    if (req.method === "PUT") {
        const raionInfo = req.body;

        const raion = await prisma.$queryRaw`UPDATE raion SET nume=${raionInfo.nume}, tipRaion=${raionInfo.tipRaion}, idMagazin=${raionInfo.idMagazin} WHERE id=${id};`

        if (!raion) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully updated raion." });
        return;
    }

    if (req.method === "DELETE") {

        const raion = await prisma.$queryRaw`DELETE FROM raion WHERE id=${id};`

        if (!raion) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully deleted raion." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

