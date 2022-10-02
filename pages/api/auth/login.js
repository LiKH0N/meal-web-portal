import nc from "next-connect";
import bcryptjs from "bcryptjs";
import { prisma } from "../../../utils/db.ts";
import { signToken } from "../../../utils/auth.js";
const handler = nc();
handler.post(async (req, res, next) => {
  try {
    const manager = await prisma.manager.findUnique({
      where: { phone: req.query.phone },
    });

    if (manager && bcryptjs.compareSync(req.query.password, manager.password)) {
      const token = signToken(manager);
      res.send({
        token,
        id: manager.id,
        name: manager.name,
        phone: manager.phone,
      });
    } else if (manager) {
      res.send("আপনার পাসওয়ার্ডটি সঠিক নয়");
    } else {
      res.send(
        `আপনার এই (${req.query.phone}) ফোন নম্বরটি দিয়ে একাউন্ট তৈরী করা হয় নি। নতুন করে একাউন্ট তৈরী করুন।`
      );
    }
  } catch (error) {
    console.log(error.message);
  }
});

export default handler;
