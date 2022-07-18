const { registerService, loginService } = require("../service/authService");

//register user
const registerUser = async (req, res) => {
  //user request
  const { name, email, password } = req.body;

  // validity check
  if ((!name, !email, !password)) {
    return res.status(400).json({ message: "Invalid data" });
  }
  try {
    //send user data
    const user = await registerService({ name, email, password });
    res.status(201).json({ message: "User create successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//-----------Login user-----------------------
const loginUser = async (req, res) => {
  //user request
  const { email, password } = req.body;
  try {
    const token = await loginService({ email, password });
    return res.status(200).json({ message: " Login Successfull", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
