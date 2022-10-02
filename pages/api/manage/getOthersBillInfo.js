import { prisma } from "../../../utils/db.ts";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    const manager = await prisma.manager.findUnique({
      where: {
        phone: req.query.userPhone,
      },
      select: {
        buyaBill: true,
        electricityBill: true,
        gasBill: true,
        waterBill: true,
        paperBill:true,
        moylaBill: true,
        othersBill: true,
      },
    });

    res.send(manager);
  } catch (error) {
    console.log(error.message);
  }
});
export default handler;
