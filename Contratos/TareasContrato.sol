// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TareasContrato {
    uint256 public NumTarea = 0;

    struct Tarea {
        uint256 Id;
        string Titulo;
        string Descripcion;
        bool Hecho;
        uint256 FechaContrato;
    }

    event TareaCreada(
        uint256 Id;
        string Titulo;
        string Descripcion;
        bool Hecho;
        uint256 FechaContrato;
    );
    event TareaHecha(uint256 Id, bool Hecho);

    mapping(uint256 => Tarea) public tareas;

    constructor() {
        CrearTarea("Mi Primera Tarea", "Mi Primera Descripcion");
    }

    function CrearTarea(string memory _titulo, string memory _descripcion)
        public
    {
        NumTarea++;
        tareas[NumTarea] = Tarea(
            NumTarea,
            _titulo,
            _descripcion,
            false,
            block.timestamp
        );
        emit TareaCreada(
            NumTarea,
            _titulo,
            _descripcion,
            false,
            block.timestamp
        );
    }
    //Funcion que permite listar una tarea completada a traves del id
    function ListarTarea(uint256 _id) public {
        Tarea memory _tarea = tareas[_id];
      // _tarea es variable interna
        _tarea.done = !_tarea.done;
        tareas[_id] = _tarea;
        emit TareaHecha(_id, _tarea.done);
    }
}
