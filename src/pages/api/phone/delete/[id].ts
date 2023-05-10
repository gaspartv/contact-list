import { corsMiddleware } from '@/middlewares/cors.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = corsMiddleware(Cors({ methods: ['DELETE'] }));

const prisma = new PrismaClient();

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { id } = req.query;

  const phoneFound = await prisma.phone.findFirst({
    where: { id: Number(id) },
  });

  if (!phoneFound) {
    return res.status(404).json({ message: 'Telefone não encontrado' });
  }

  await prisma.phone.delete({
    where: { id: phoneFound.id },
  });

  return res.status(200).json({ message: 'Telefone deletado com sucesso.' });
};

export default handle;
