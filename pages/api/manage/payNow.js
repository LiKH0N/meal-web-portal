import nextConnect from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = new nextConnect();
handler.put(async (req, res) => {
  try {
    await prisma.person.updateMany({
      where: { id: req.query.id },
      data: { joma: { increment: Number(req.body.amount) } },
    });

    res.send("টাকা সঠিকভাবে যুক্ত করা হয়েছে!");
  } catch (error) {
    res.send(error.message);
  }
});
export default handler;
