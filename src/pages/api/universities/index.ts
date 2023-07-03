import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { universityValidationSchema } from 'validationSchema/universities';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getUniversities();
    case 'POST':
      return createUniversity();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUniversities() {
    const data = await prisma.university
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'university'));
    return res.status(200).json(data);
  }

  async function createUniversity() {
    await universityValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.d_model?.length > 0) {
      const create_d_model = body.d_model;
      body.d_model = {
        create: create_d_model,
      };
    } else {
      delete body.d_model;
    }
    if (body?.comment?.length > 0) {
      const create_comment = body.comment;
      body.comment = {
        create: create_comment,
      };
    } else {
      delete body.comment;
    }
    const data = await prisma.university.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
