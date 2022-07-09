function isAdmin(role) {
  return role === "ADMIN";
}

function isRegular(role) {
  return role === "REGULAR";
}

module.exports = { 
  isAdmin,
  isRegular
};