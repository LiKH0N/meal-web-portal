import nextConnect from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = new nextConnect();
handler.put(async (req, res) => {
  
  try {
    await prisma.person.updateMany({
      where: { id: req.query.id },
      data: {
        name: req.body.name,
        joma: Number(req.body.joma),
        mealCount: Number(req.body.mealCount),
      },
    });

    res.send("সঠিকভাবে যুক্ত করা হয়েছে!");
  } catch (error) {
    res.send(error.message);
  }
});
export default handler;
