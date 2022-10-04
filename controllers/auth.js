const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { generarJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }
    user = new User(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //generar jwt
    const token = await generarJWT(user.uid, user.name);
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Porfavor hable con el admin total pro",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "el user no existe",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "password incorrecta",
      });
    }
    //generar jwt
    const token = await generarJWT(user.uid, user.name);
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Porfavor hable con el admin total pro",
    });
  }
};

const tokenCheck = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  //generar un nuevo jwt y retornarlo

  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    token,
  });
};

module.exports = { createUser, loginUser, tokenCheck };
