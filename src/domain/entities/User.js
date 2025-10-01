class User {
  constructor({ id, nombre, email, password, rol, createdAt }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.createdAt = createdAt;
  }
}

module.exports = User;
