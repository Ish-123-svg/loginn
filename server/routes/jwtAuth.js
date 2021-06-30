const router = require("express").Router();
const pool = require("../../database/index");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
  try {
    const {
      lastName,
      firstName,
      email,
      password,
      retypePassword,
      phoneNumber,
      organization,
    } = req.body;
    const user = await pool.query("select * from users where user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    if (password !== retypePassword) {
      return res.status(401).send("Passwords do not match");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
      "insert into users(user_last_name, user_first_name, user_email, user_password, user_phone_number, user_organization) values ($1, $2, $3, $4, $5, $6) returning *",
      [lastName, firstName, email, bcryptPassword, phoneNumber, organization]
    );
    res.json(newUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("select * from users where user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or email incorrect");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password or Username is incorrect");
    }

    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json(`Token: ${jwtToken}, verifying`);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
