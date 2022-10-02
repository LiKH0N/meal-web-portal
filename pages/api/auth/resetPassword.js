import bcryptjs from "bcryptjs";
import nextConnect from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = new nextConnect();
handler.put(async (req, res) => {
  try {
    const isExist = await prisma.manager.count({
      where: {
        phone: req.query.phone,
      },
    });
    if (isExist == 0) {
      res.send(`কোন একাউন্ট খুজে পাওয়া যাইনি`);
    }
    await prisma.manager.updateMany({
      where: {
        phone: req.query.phone,
      },
      data: {
        password: bcryptjs.hashSync(req.query.password, 10),
      },
    });
    res.send("আপনার পাসওয়ার্ডটি সঠিকভাবে পরিবর্তন করা হয়েছে!");
  } catch (error) {
    res.send(error.message);
  }
});
export default handler;
