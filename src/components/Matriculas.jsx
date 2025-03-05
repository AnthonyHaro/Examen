import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Matriculas.css';  // Asegúrate de que este archivo CSS exista
import Menu from "./Menu";

const Matriculas = () => {
    const [matriculas, setMatriculas] = useState([]);
    const [newRow, setNewRow] = useState({ code: '', description: '', credits: '', subject: '', student: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [user, setUser] = useState(null);

    // Obtener matriculas y nombre del usuario al cargar el componente
    useEffect(() => {
        // Obtener matriculas
        axios.get("http://localhost:5000/matriculas")
            .then(response => setMatriculas(response.data))
            .catch(error => console.error("Error al obtener matriculas:", error));

        // Obtener usuario
        axios.get("http://localhost:5000/user")
            .then(response => setUser(response.data))
            .catch(error => console.error("Error al obtener usuario:", error));
    }, []);

    const handleAddRow = () => {
        if (newRow.code && newRow.description && newRow.credits && newRow.subject && newRow.student) {
            axios.post("http://localhost:5000/matriculas", newRow)
                .then(response => {
                    setMatriculas([...matriculas, response.data]);
                    setNewRow({ code: '', description: '', credits: '', subject: '', student: '' });
                    setIsAdding(false);
                })
                .catch(error => console.error("Error al agregar matrícula:", error));
        }
    };

    const handleEditRow = (index) => {
        const updatedMatriculas = [...matriculas];
        updatedMatriculas[index].isEditing = true;
        setMatriculas(updatedMatriculas);
    };

    const handleSaveRow = (index) => {
        const updatedMatriculas = [...matriculas];
        updatedMatriculas[index].isEditing = false;
        setMatriculas(updatedMatriculas);
    };

    const handleDeleteRow = (index) => {
        const updatedMatriculas = matriculas.filter((_, i) => i !== index);
        setMatriculas(updatedMatriculas);
    };

    const handleCancelEdit = (index) => {
        const updatedMatriculas = [...matriculas];
        updatedMatriculas[index].isEditing = false;
        setMatriculas(updatedMatriculas);
    };

    const handleInputChange = (e, field, index) => {
        const value = e.target.value;
        const updatedMatriculas = [...matriculas];
        updatedMatriculas[index][field] = value;
        setMatriculas(updatedMatriculas);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h2>Bienvenido <b>{user ? user.name : "Cargando..."}</b></h2>
                                </div>
                                <div className="col-sm-4">
                                    <button
                                        type="button"
                                        className="btn btn-info add-new"
                                        onClick={() => setIsAdding(true)}
                                    >
                                        <i className="fa fa-plus"></i> Agregar Nueva Matrícula
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>Créditos</th>
                                    <th>Materia</th>
                                    <th>Estudiante</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matriculas.map((matricula, index) => (
                                    <tr key={index}>
                                        <td>
                                            {matricula.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={matricula.code}
                                                    onChange={(e) => handleInputChange(e, 'code', index)}
                                                />
                                            ) : (
                                                matricula.code
                                            )}
                                        </td>
                                        <td>
                                            {matricula.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={matricula.description}
                                                    onChange={(e) => handleInputChange(e, 'description', index)}
                                                />
                                            ) : (
                                                matricula.description
                                            )}
                                        </td>
                                        <td>
                                            {matricula.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={matricula.credits}
                                                    onChange={(e) => handleInputChange(e, 'credits', index)}
                                                />
                                            ) : (
                                                matricula.credits
                                            )}
                                        </td>
                                        <td>
                                            {matricula.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={matricula.subject}
                                                    onChange={(e) => handleInputChange(e, 'subject', index)}
                                                />
                                            ) : (
                                                matricula.subject
                                            )}
                                        </td>
                                        <td>
                                            {matricula.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={matricula.student}
                                                    onChange={(e) => handleInputChange(e, 'student', index)}
                                                />
                                            ) : (
                                                matricula.student
                                            )}
                                        </td>
                                        <td>
                                            {matricula.isEditing ? (
                                                <>
                                                    <a
                                                        className="save"
                                                        title="Guardar"
                                                        onClick={() => handleSaveRow(index)}
                                                    >
                                                        <i className="material-icons" style={{ color: 'green' }}>&#xE876;</i>
                                                    </a>
                                                    <a
                                                        className="cancel"
                                                        title="Cancelar"
                                                        onClick={() => handleCancelEdit(index)}
                                                    >
                                                        <i className="material-icons" style={{ color: 'red' }}>&#xE5CD;</i>
                                                    </a>
                                                </>
                                            ) : (
                                                <>
                                                    <a
                                                        className="edit"
                                                        title="Editar"
                                                        onClick={() => handleEditRow(index)}
                                                    >
                                                        <i className="material-icons">&#xE254;</i>
                                                    </a>
                                                    <a
                                                        className="delete"
                                                        title="Eliminar"
                                                        onClick={() => handleDeleteRow(index)}
                                                    >
                                                        <i className="material-icons">&#xE872;</i>
                                                    </a>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {isAdding && (
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newRow.code}
                                                onChange={(e) => setNewRow({ ...newRow, code: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newRow.description}
                                                onChange={(e) => setNewRow({ ...newRow, description: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newRow.credits}
                                                onChange={(e) => setNewRow({ ...newRow, credits: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newRow.subject}
                                                onChange={(e) => setNewRow({ ...newRow, subject: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newRow.student}
                                                onChange={(e) => setNewRow({ ...newRow, student: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <a
                                                className="save"
                                                title="Guardar"
                                                onClick={handleAddRow}
                                            >
                                                <i className="material-icons" style={{ color: 'green' }}>&#xE876;</i>
                                            </a>
                                            <a
                                                className="delete"
                                                title="Cancelar"
                                                onClick={() => setIsAdding(false)}
                                            >
                                                <i className="material-icons" style={{ color: 'red' }}>&#xE872;</i>
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Lateral Component */}
                <div className="col-md-3">
                    <Menu />
                </div>
            </div>
        </div>
    );
};

export default Matriculas;
