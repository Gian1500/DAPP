document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

/**
 * Task form
 */
const TareaFormulario = document.querySelector("#TareaFormulario");

TareaFormulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = TareaFormulario["titulo"].value;
  const descripcion = TareaFormulario["descripcion"].value;
  App.crearTarea(titulo, descripcion);
});
