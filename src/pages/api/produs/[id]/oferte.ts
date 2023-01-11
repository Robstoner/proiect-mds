import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    const { id } = req.query;

    if (req.method === "GET") {

        const produs_oferte = await prisma.$queryRaw`select p.nume produs, p.pret, of.id idOferta, of.nume oferta, of.procentajReducere, of.dataInceput, of.dataFinal
                                                        from produs p
                                                        join istoric_oferte ist on p.id = ist.idProdus
                                                        join oferta of on of.id = ist.idOferta
                                                        where p.id = ${id}
                                                        and of.procentajReducere > 0.15;`

        if (!produs_oferte) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(produs_oferte);
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

