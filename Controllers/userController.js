
const User = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registra un nuevo usuario
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try{
    const existUser = await User.findOne({ where: {email}}); //valida el usuario por el email
    if (existUser){
        return res.status(400).json ({ errors: [{msg:'El email ya exite'}]})
    }
    const hashedPassword = await bcrypt.hash(password, 10);// Encripta la contraseña antes de almacenarla en la base de datos
    const newuser = await User.create({ username, email, password: hashedPassword });// se crea el nuevo usuario
    
    // Aca creamos el token del nuevo usuario
    const token = jwt.sign({ id: newuser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: newuser });
  }
  catch (error){
    res.status(500).json ({error: 'Error en el servidor'})
  }
};


// Inicio de sesión del usuario
exports.login = async (req, res) => {
  const { email, password } = req.body; // trae el email y la password del usuario
  const user = await User.findOne({ where: { email } }); // busca al usuario por email
  if (!user || !(await bcrypt.compare(password, user.password))) { // si no lo encuentra larga el msj de invalido
    return res.status(401).json({ error: 'email o password invalido' });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user }); // creo el token que tiene la duracion de 1 hora
};


// Obtiene todos los usuarios
exports.getUsers = async (req, res) => {
  const users = await User.findAll(); //obtiene todos los registros de la tabla 
  res.json(users); // envia la lista de los usuarios en formato json
};

// Actualiza un usuario existente
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  await User.update(req.body, { where: { id } }); // se actualizan por el id
  const user = await User.findByPk(id);
  res.json(user); // envia el usuario actualizado en formato json
};

// Elimina un usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } }); // elimina el usuario por el id
  res.json({ msg: 'Usuario eliminado' }); // envia un msj con el usuario eliminado en formato json
};
