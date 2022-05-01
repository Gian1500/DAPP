const Migraciones = artifacts.require("Migraciones");

// Trae el modulo migraciones y si existe lo despliega
module.exports = function (deployer) {
  deployer.deploy(Migraciones);
};
