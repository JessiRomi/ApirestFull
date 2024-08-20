
//autenticacion del jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtiene el token JWT 
  if (!token) return res.status(401).json({ error: 'No autorizado' });// Si no hay token, retorna un error 401 (No autorizado)

 // Verifica el token JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'prohibido' });   // Si el token no es valido, retorna un error 403 (Prohibido)
    req.user = decoded; // Si el token es valido, almacena la informacion del usuario en la solicitud y sigue
    next();
  });
};