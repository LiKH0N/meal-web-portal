import nextConnect from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = new nextConnect();
handler.delete(async (req, res) => {
  try {
    await prisma.person.delete({
      where: { id: req.query.id },
    });

    res.send("সঠিকভাবে ডিলিট হয়েছে");
  } catch (error) {
    res.send(error.message);
  }
});
export default handler;
