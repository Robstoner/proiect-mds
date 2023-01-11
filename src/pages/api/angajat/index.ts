import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    if (req.method === "GET") {
        const angajati = await prisma.$queryRaw`SELECT * FROM angajat;`

        if (!angajati) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(angajati);
        return;
    }

    if (req.method === "POST") {
        const angajatInfo = req.body;

        const angajat = await prisma.$queryRaw`INSERT INTO angajat (nume, prenume, dataAngajarii)
                                                VALUES (${angajatInfo.nume}, ${angajatInfo.prenume}, ${angajatInfo.dataAngajarii});`

        if (!angajat) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully created angajat." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

