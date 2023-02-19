const bcrypt = require("bcrypt");
const User = require("../../models/User");
const { userRoles } = require("../../constants/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    throw new Error(
      "You must provide an username, email or password to register"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = { username, email, password: hashedPassword };

  const userInDb = await User.countDocuments();
  if (userInDb === 0) newUser.role = userRoles.ADMIN;

  await User.create(newUser);

  return res.status(201).json({ message: "Success. Please log in" });
};

exports.login = async (req, res) => {
  const { username, password: candidatePassword } = req.body;

  if (!username || !candidatePassword) {
    throw new Error("You must provde username and password to log in");
  }

  const user = await User.findOne({ username: username });
  if (!username) throw new Error("Invalid credentials");

  const isPasswordCorrect = await bcrypt.compare(
    candidatePassword,
    user.password
  );

  if (!isPasswordCorrect) throw new Error("Invalid credentials");

  const jwtPayLoad = {
    userId: user._id,
    role: user.role,
    username: user.username
  }

  const jwtToken = jwt.sign(jwtPayLoad, process.env.JWT_SECRET, {
    expiresIn: '2h'
  })

  return res.json({
    token: jwtToken,
    user: jwtPayLoad
  })
};
