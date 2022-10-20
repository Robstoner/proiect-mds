import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    if (req.method === "POST") {
        const francizaInfo = req.body;

        const franciza = await prisma.franciza.create({
            data: {
                numeDetinator: francizaInfo.numeDetinator,
                tara: francizaInfo.tara,
                nrAngajati: 0,
            },
        }).catch(err => {
            console.log(err);
            return;
        })

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

