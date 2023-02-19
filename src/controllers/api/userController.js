const { userRoles } = require("../../constants/user");
const User = require("../../models/User");

exports.deleteUserById = async (req, res) => {
  const userId = req.params.userId;

  if (req.user.role !== userRoles.ADMIN && userId !== req.user.userId) {
    throw new Error("Unauthorized access");
  }

  const user = await User.findById(userId);

  if (!user) throw new Error("That user does not exist");

  await user.delete()

  return res.sendStatus(204)
};
