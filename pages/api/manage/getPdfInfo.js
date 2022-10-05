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
    let totalUtilityBill =
      manager.electricityBill +
      manager.gasBill +
      manager.moylaBill +
      manager.othersBill +
      manager.waterBill +
      manager.paperBill;

    const data = {
      persons: manager.persons,
      mealRate: mealRate,
      bajar: manager.bajar,
      joma: joma,
      buyaBillEachPerson: manager.buyaBill / manager.persons.length,
      utilityBillEachPerson: totalUtilityBill / manager.persons.length,
      buyaBill: manager.buyaBill,
      totalMeal: totalMeal,
      electricityBill: manager.electricityBill,
      gasBill: manager.gasBill,
      moylaBill: manager.moylaBill,
      waterBill: manager.waterBill,
      paperBill: manager.paperBill,
      othersBill: manager.othersBill,
      utilityBill: totalUtilityBill,
      totalCost: manager.bajar + totalUtilityBill + manager.buyaBill,
      whichMonth: manager.updatedAt,
    };

    res.send(data);
  } catch (error) {
    console.log(error.message);
  }
});
export default handler;
