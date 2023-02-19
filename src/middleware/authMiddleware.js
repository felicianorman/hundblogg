const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    throw new Error("Authentication invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      // @ts-ignore
      userId: payload.userId,
      // @ts-ignore
      role: payload.role,
      // @ts-ignore
      username: payload.username,
    };

    next()
  } catch (error) {
    console.log(error)
  }
};
