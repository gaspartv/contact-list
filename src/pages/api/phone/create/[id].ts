import { corsMiddleware } from '@/middlewares/cors.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

const cors = corsMiddleware(Cors({ methods: ['POST'] }));

const prisma = new PrismaClient();

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedBody = await yup
      .object()
      .shape({
        num: yup.string().required(),
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

  const nameFound = await prisma.contact.findFirst({
    where: { id: Number(id) },
  });

  if (!nameFound) {
    return res.status(400).json({ message: 'Contato não encontrado.' });
  }

  const newPhone = await prisma.phone.create({
    data: {
      id: Number(Math.floor(Math.random() * 100000000000000)),
      num: req.body.num,
      contactId: Number(id),
    },
  });

  return res.status(201).json(newPhone);
};

export default handle;
