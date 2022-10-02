import jwt from "jsonwebtoken";

export const signToken = (manager) => {
  return jwt.sign(
    {
      id: manager.id,
      name: manager.name,
      phone: manager.phone,
    },
    process.env.JWT_Secreet,
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_Secreet, (error, decode) => {
      if (error) {
        res.send("Token is not valid");
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.send("Token is empty");
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "User is not admin" });
  }
};
