import { corsMiddleware } from '@/middlewares/cors.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = corsMiddleware(Cors({ methods: ['DELETE'] }));

const prisma = new PrismaClient();

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { id } = req.query;

  const nameFound = await prisma.contact.findFirst({
    where: { id: Number(id) },
  });

  if (!nameFound) {
    return res.status(404).json({ message: 'Contato não encontrado' });
  }

  await prisma.contact.delete({
    where: { id: Number(id) },
  });

  const log = `Contato excluido: ${nameFound.name} ${new Date()}\n`;

  fs.appendFileSync('log.txt', log);

  return res.status(200).json({ message: 'Contato deletado com sucesso.' });
};

export default handle;
