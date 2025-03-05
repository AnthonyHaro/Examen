import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Materias.css'; 
import Menu from "./Menu";

const Materias = () => {
    const [subjects, setSubjects] = useState([]);
    const [newRow, setNewRow] = useState({ name: '', code: '', description: '', credits: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [user, setUser] = useState(null);

    // Obtener materias y nombre del usuario al cargar el componente
    useEffect(() => {
        // Obtener materias
        axios.get("http://localhost:5000/subjects")
            .then(response => setSubjects(response.data))
            .catch(error => console.error("Error al obtener materias:", error));

        // Obtener usuario
        axios.get("http://localhost:5000/user")
            .then(response => setUser(response.data))
            .catch(error => console.error("Error al obtener usuario:", error));
    }, []);

    const handleAddRow = () => {
        if (newRow.name && newRow.code && newRow.description && newRow.credits) {
            axios.post("http://localhost:5000/subjects", newRow)
                .then(response => {
                    setSubjects([...subjects, response.data]);
                    setNewRow({ name: '', code: '', description: '', credits: '' });
                    setIsAdding(false);
                })
                .catch(error => console.error("Error al agregar materia:", error));
        }
    };

    const handleEditRow = (index) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].isEditing = true;
        setSubjects(updatedSubjects);
    };

    const handleSaveRow = (index) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].isEditing = false;
        setSubjects(updatedSubjects);
    };

    const handleDeleteRow = (index) => {
        const updatedSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(updatedSubjects);
    };

    const handleCancelEdit = (index) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].isEditing = false;
        setSubjects(updatedSubjects);
    };

    const handleInputChange = (e, field, index) => {
        const value = e.target.value;
        const updatedSubjects = [...subjects];
        updatedSubjects[index][field] = value;
        setSubjects(updatedSubjects);
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
                                        <i className="fa fa-plus"></i> Agregar Nueva Materia
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre de Materia</th>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>Créditos</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map((subject, index) => (
                                    <tr key={index}>
                                        <td>
                                            {subject.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={subject.name}
                                                    onChange={(e) => handleInputChange(e, 'name', index)}
                                                />
                                            ) : (
                                                subject.name
                                            )}
                                        </td>
                                        <td>
                                            {subject.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={subject.code}
                                                    onChange={(e) => handleInputChange(e, 'code', index)}
                                                />
                                            ) : (
                                                subject.code
                                            )}
                                        </td>
                                        <td>
                                            {subject.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={subject.description}
                                                    onChange={(e) => handleInputChange(e, 'description', index)}
                                                />
                                            ) : (
                                                subject.description
                                            )}
                                        </td>
                                        <td>
                                            {subject.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={subject.credits}
                                                    onChange={(e) => handleInputChange(e, 'credits', index)}
                                                />
                                            ) : (
                                                subject.credits
                                            )}
                                        </td>
                                        <td>
                                            {subject.isEditing ? (
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
                                                value={newRow.name}
                                                onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
                                            />
                                        </td>
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

export default Materias;
