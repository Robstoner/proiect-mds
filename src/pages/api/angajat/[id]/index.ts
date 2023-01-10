import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    const { id } = req.query;

    if (req.method === "GET") {

        const angajat = await prisma.$queryRaw`SELECT * FROM angajat WHERE id=${id};`

        if (!angajat) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(angajat[0]);
        return;
    }

    if (req.method === "PUT") {
        const angajatInfo = req.body;

        const angajat = await prisma.$queryRaw`UPDATE angajat SET nume=${angajatInfo.nume}, prenume=${angajatInfo.prenume}, dataAngajarii=${angajatInfo.dataAngajarii} WHERE id=${id};`

        if (!angajat) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully updated angajat." });
        return;
    }

    if (req.method === "DELETE") {

        const angajat = await prisma.$queryRaw`DELETE FROM angajat WHERE id=${id};`

        if (!angajat) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully deleted angajat." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

