App = { 
  Contratos: {},
  init: async () => {
    await App.cargarWeb3();
    await App.conectarCuenta();
    await App.cargarContrato();
    await App.cargarCuenta();
    await App.cargarTarea();
  },
  
 //Conectar Con MetaMask
  cargarWeb3: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (web3) {
       //soporte a versiones antiguas
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "No Esta Instalado Ethereum En El Navegador. Intenta Instalando MetaMask"
      );
    }
  },
  
  //Conectar Con la Cuenta del Usuario
  conectarCuenta: async () => {
    const cuentas = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    App.cuenta = cuentas[0];
  },

  //Subir el contrato por MetaMask
  cargarContrato: async () => {
    try {
      const res = await fetch("/build/TasksContract.json");
      const tareasContratoJSON = await res.json();
      App.Contratos.tareasContrato = TruffleContract(tareasContratoJSON);
      App.Contratos.tareasContrato.setProvider(App.web3Provider);

      App.tareasContrato = await App.Contratos.tareasContrato.deployed();
    } catch (error) {
      console.error(error);
    }
  },
  
  cargarCuenta: async () => {
    document.getElementById("cuenta").innerText = App.cuenta;
  },
  
  cargarTarea: async () => {
    const contadorTareas = await App.tareasContrato.tasksCounter();
    const numeroContadorTareas = contadorTareas.toNumber();

    let html = "";

    for (let i = 1; i <= numeroContadorTareas; i++) {
      const tarea = await App.tareasContrato.tasks(i);
      const tareaId = tarea[0].toNumber();
      const tituloTarea = tarea[1];
      const descripcionTarea = tarea[2];
      const tareaTerminada = tarea[3];
      const fechaTarea = tarea[4];

      // Crear Tarjeta de Tarea
      let elementoTarea = `<div class="card bg-dark rounded-0 mb-2">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>${tituloTarea}</span>
          <div class="form-check form-switch">
            <input class="form-check-input" data-id="${tareaId}" type="checkbox" onchange="App.tareaHecha(this)" ${
              tareaTerminada === true && "checked"
            }>
          </div>
        </div>
        <div class="card-body">
          <span>${descripcionTarea}</span>
          <span>${tareaTerminada}</span>
          <p class="text-muted">Tarea Creada ${new Date(
            fechaTarea * 1000
          ).toLocaleString()}</p>
          </label>
        </div>
      </div>`;
      html += elementoTarea;
    }

    document.querySelector("#listaTareas").innerHTML = html;
  },
  
  crearTarea: async (titulo, descripcion) => {
    try {
      const resultado = await App.tareasContrato.createTask(titulo, descripcion, {
        from: App.cuenta,
      });
      console.log(resultado.logs[0].args);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  },
  tareaHecha: async (elemento) => {
    const tareaId = elemento.dataset.id;
    await App.tareasContrato.toggleDone(tareaId, {
      from: App.cuenta,
    });
    window.location.reload();
  },
};
