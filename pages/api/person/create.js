import nextConnect from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = new nextConnect();
handler.post(async (req, res) => {
  try {
    const { persons } = await prisma.manager.findUnique({
      where: {
        id: req.query.managerId,
      },
      select: {
        persons: true,
      },
    });
    const isExits = persons.filter((item) => item.name == req.body.name);
    if (isExits.length > 0) {
      res.send("alreadyExists");
    } else {
      await prisma.person.create({
        data: {
          name: req.body.name,
          authorId: req.query.managerId,
        },
      });
      res.send(`সঠিকভাবে যুক্ত করা হয়েছে!`);
    }
  } catch (error) {
    res.send(error.message);
  }
});
export default handler;
