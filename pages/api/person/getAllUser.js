import { prisma } from "../../../utils/db.ts";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    const manager = await prisma.manager.findMany();
    if (manager) {
      res.send(manager);
    }
    res.send("No user found");
  } catch (error) {
    console.log(error.message);
  }
});
export default handler;
