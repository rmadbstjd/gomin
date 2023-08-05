// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import FirebaseAdmin from "@/models/firebase_admins";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  FirebaseAdmin.getInstance().Firebase.collection("test");
  console.log("테스트");
  res.status(200).json({ hi: "zz", name: "John Doe1" });
}
