import { corsMiddleware } from '@/middlewares/cors.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

const cors = corsMiddleware(Cors({ methods: ['PATCH'] }));

const prisma = new PrismaClient();

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const validatedBody = await yup
      .object()
      .shape({
        name: yup.string().max(100).required(),
        age: yup.number().max(999).required(),
      })
      .validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

    req.body = validatedBody;
  } catch ({ message }: any) {
    return res.status(400).json({ message });
  }

  const { id } = req.query;

  const { name, age } = req.body;

  const nameFound = await prisma.contact.findFirst({
    where: { id: Number(id) },
  });

  if (!nameFound) {
    return res.status(400).json({ message: 'Contato não encontrado.' });
  }

  const userEdit = await prisma.contact.update({
    where: { id: Number(id) },
    data: req.body,
  });

  return res.status(200).json(userEdit);
};

export default handle;
