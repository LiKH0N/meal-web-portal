import { prisma } from "../../../utils/db.ts";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    const manager = await prisma.manager.findUnique({
      where: {
        phone: req.query.userPhone,
      },
      include: {
        persons: true,
      },
    });

    const totalMeal = manager.persons.reduce((a, c) => a + c.mealCount, 0);
    const joma = manager.persons.reduce((a, c) => a + c.joma, 0);

    let mealRate = manager.bajar / totalMeal;

    const data = {
      persons: manager.persons,
      mealRate: mealRate,
      bajar: manager.bajar,
      joma: joma,
      totalMeal: totalMeal,
      buyaBill: manager.buyaBill / manager.persons.length,
      utilityBill:
        (manager.electricityBill +
          manager.gasBill +
          manager.moylaBill +
          manager.waterBill +
          manager.paperBill +
          manager.othersBill) /
        manager.persons.length,
      whichMonth: manager.updatedAt,
    };
    res.send(data);
  } catch (error) {
    console.log(error.message);
  }
});
export default handler;
