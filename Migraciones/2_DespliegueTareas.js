const TareasContrato = artifacts.require("TareasContrato.sol");


//Trae un modulo si este existe y en caso positivo, deploy lo despliega.
module.exports = function (deployer) {
  deployer.deploy(TareasContrato);
};
