import { PrismaClient } from '@prisma/client';
import React from 'react';
import { Request, Response } from 'express';

const express = require('express');

const prisma = new PrismaClient();
export default async function handler(req: Request, res: Response) {
  const users = await prisma.user.findMany();
  res.status(200).json([{ data: users }]);
}
