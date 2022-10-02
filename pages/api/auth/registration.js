import bcryptjs from "bcryptjs";
import nextConnect from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = new nextConnect();
handler.post(async (req, res) => {
  try {
    const isExist = await prisma.manager.count({
      where: {
        phone: req.body.phone,
      },
    });
    if (isExist) {
      res.send(
        `আপনার এই ${req.body.phone} নম্বর টি অন্য একটি একাউন্টের সাথে যুক্ত আছে! আপনি পুরাতন একাউন্টি ডিলেট করে আবার নতুন মাসের জন্য একাউন্ট খুলতে পারবেন।ধন্যবাদ।`
      );
    }
    await prisma.manager.create({
      data: {
        name: req.body.name,
        phone: req.body.phone,
        password: bcryptjs.hashSync(req.body.password, 10),
      },
    });
    res.send("আপনার একাউন্টি সঠিকভাবে তৈরী করা হয়েছে!");
  } catch (error) {
    res.send(error.message);
  }
});
export default handler;
