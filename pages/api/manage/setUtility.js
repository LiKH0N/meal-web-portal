import nextConnect from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = new nextConnect();
handler.put(async (req, res) => {
  try {
    await prisma.manager.updateMany({
      where: { id: req.query.id },
      data: {
        buyaBill: Number(req.body.buyaBill),
        electricityBill: Number(req.body.electricityBill),
        gasBill: Number(req.body.gasBill),
        moylaBill: Number(req.body.moylaBill),
        waterBill: Number(req.body.waterBill),
        paperBill: Number(req.body.paperBill),
        othersBill: Number(req.body.othersBill),
      },
    });

    res.send("সঠিকভাবে যুক্ত করা হয়েছে!");
  } catch (error) {
    res.send(error.message);
  }
});
export default handler;
