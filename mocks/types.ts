import { Request, Response } from "express";

export type Variant = {
  id: string;
  type: string;
  options: {
    status?: number;
    body?: unknown;
    middleware?: (req: Request, res: Response) => void;
  };
};

export type MockRoute = {
  id: string;
  url: string;
  method: string;
  variants: Variant[];
};
