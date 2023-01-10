import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    const { id } = req.query;
    let temp = String(id).split('_');
    const idAngajat = temp[0];
    const dataInceput = temp[1];

    if (req.method === "GET") {

        const contract = await prisma.$queryRaw`SELECT * FROM contract WHERE idAngajat=${idAngajat} and dataInceput=${dataInceput};`

        if (!contract) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json(contract[0]);
        return;
    }

    if (req.method === "PUT") {
        const contractInfo = req.body;

        const contract = await prisma.$queryRaw`UPDATE contract SET dataInceput=${contractInfo.dataInceput}, dataFinal=${contractInfo.dataFinal}, idAngajat=${contractInfo.idAngajat}, 
                                                                idPost=${contractInfo.idPost}, idMagazin=${contractInfo.idMagazin} WHERE idAngajat=${idAngajat} and dataInceput=${dataInceput};`

        if (!contract) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully updated contract." });
        return;
    }

    if (req.method === "DELETE") {

        const contract = await prisma.$queryRaw`DELETE FROM contract WHERE idAngajat=${idAngajat} and dataInceput=${dataInceput};`

        if (!contract) {
            res.status(500).json({ message: "Internal server error." });
            return;
        }

        res.status(200).json({ message: "Succesfully deleted contract." });
        return;
    }

    res.status(405).json({ message: "Method not allowed" });
    return;
}

