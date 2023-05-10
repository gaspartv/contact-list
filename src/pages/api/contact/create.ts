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

  const { name, age } = req.body;

  const nameFound = await prisma.contact.findFirst({
    where: { name },
  });

  if (nameFound) {
    return res.status(400).json({ message: 'Contato já registrado.' });
  }

  const newName = await prisma.contact.create({
    data: {
      id: Number(Math.floor(Math.random() * 100000000000000)),
      name,
      age,
    },
  });

  return res.status(201).json({
    ...newName,
    phone: [],
  });
};

export default handle;
