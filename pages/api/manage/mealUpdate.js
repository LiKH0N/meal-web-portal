import nextConnect from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = new nextConnect();
handler.put(async (req, res) => {
  try {
    req.body.forEach(async (element) => {
      await prisma.person.updateMany({
        where: { id: element.id },
        data: {
          mealCount: {
            increment: element.mealCount
              ? Number(element.mealCount)
              : Number(0),
          },
        },
      });
    });
    res.send("আপনার মিল সঠিকভাবে যুক্ত করা হয়েছে!");
  } catch (error) {
    res.send(error.message);
  }
});
export default handler;
