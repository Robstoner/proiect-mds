import { prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient();

    if (req.method === "POST") {
        //const francizaInfo = req.body;

        const franciza = await prisma.franciza.create({
            data: {
                numeDetinator: 'Pedro',
                tara: 'Mexic',
                nrAngajati: 0,
            },
        }).catch(err => {
            console.log(err);
            return;
        }) 
    }
}

