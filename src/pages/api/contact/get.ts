import { corsMiddleware } from '@/middlewares/cors.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = corsMiddleware(Cors({ methods: ['GET'] }));

const prisma = new PrismaClient();

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const contacts = await prisma.contact.findMany({
    include: { phone: true },
  });

  return res.status(200).json(contacts);
};

export default handle;
