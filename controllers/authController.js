const { User } = require("../models");
const middleware = require("../middleware");

const Register = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await middleware.hashPassword(password);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send("A user with that email has already been registered!");
    } else {
      const user = await User.create({ name, email, password: hashedPassword });
      res.send(user);
    }
  } catch (error) {
    throw error;
  }
};

const Login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordMatch = await middleware.comparePassword(
      user.passwordDigest,
      password
    );
    if (isPasswordMatch) {
      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = middleware.createToken(payload);
      return res.send({ user: payload, token });
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: "Error", msg: "An error has occurred!" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.params.user_id);
    const isOldPasswordMatch = await middleware.comparePassword(
      user.passwordDigest,
      oldPassword
    );
    if (isOldPasswordMatch) {
      const hashedNewPassword = await middleware.hashPassword(newPassword);
      const updatedUser = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest: hashedNewPassword,
      });
      const payload = {
        id: updatedUser.id,
        email: updatedUser.email,
      };
      return res.send({ status: "Password Updated!", user: payload });
    }
    res
      .status(401)
      .send({ status: "Error", msg: "Old Password did not match!" });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Error",
      msg: "An error has occurred updating password!",
    });
  }
};

const checkSession = async (req, res) => {
  const { payload } = res.locals;
  res.send(payload);
};

module.exports = {
  Register,
  Login,
  updatePassword,
  checkSession,
};