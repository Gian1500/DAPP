const TareasContrato = artifacts.require("TareasContrato");
//permite crear las tareas del contrato
contract("TareasContrato", (cuentas) => {
  before(async () => {
    this.TareasContrato = await TasksContract.deployed();
  });

  it("Migracion Desplegada Correctamente", async () => {
    const address = await this.TareasContrato.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("Traer Lista de Tareas", async () => {
    const ContadorTareas = await this.TareasContrato.ContadorTareas();
    const tarea = await this.TareasContrato.tareas(ContadorTareas);

    assert.equal(tarea.id.toNumber(), ContadorTareas.toNumber());
    assert.equal(tarea.titulo, "Mi Primera Tarea");
    assert.equal(tarea.descripcion, "Mi Primera Descripcion");
    assert.equal(tarea.done, false);
    assert.equal(ContadorTareas, 1);
  });

  it("Tarea Creada Correctamente", async () => {
    const resultado = await this.TareasContrato.CrearTarea("Mi Segunda Tarea", "Mi Segunda Descripcion");
    const eventoTarea = resultado.logs[0].args;
    const ContadorTareas = await this.TareasContrato.ContadorTareas();

    assert.equal(ContadorTareas, 2);
    assert.equal(eventoTarea.id.toNumber(), 2);
    assert.equal(eventoTarea.titulo, "Mi Segunda Tarea");
    assert.equal(eventoTarea.descripcion, "Mi Segunda Descripcion");
    assert.equal(eventoTarea.done, false);
  });

  it("Tarea Listada", async () => {
    const resultado = await this.TareasContrato.ListarTarea(1);
    const eventoTarea = resultado.logs[0].args;
    const tarea = await this.TareasContrato.tareas(1);

    assert.equal(tarea.done, true);
    assert.equal(eventoTarea.id.toNumber(), 1);
    assert.equal(eventoTarea.done, true);
  });
});
