import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Estudiantes.css';
import Menu from "./Menu";

const Estudiantes = () => {
    const [students, setStudents] = useState([]);
    const [newRow, setNewRow] = useState({
        name: '', lastName: '', cedula: '', birthDate: '', city: '', address: '', phone: '', email: ''
    });
    const [isAdding, setIsAdding] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Obtener estudiantes
        axios.get("http://localhost:5000/students")
            .then(response => setStudents(response.data))
            .catch(error => console.error("Error al obtener estudiantes:", error));

        // Obtener usuario
        axios.get("http://localhost:5000/user")
            .then(response => setUser(response.data))
            .catch(error => console.error("Error al obtener usuario:", error));
    }, []);

    const handleAddRow = () => {
        if (newRow.name && newRow.lastName && newRow.cedula && newRow.birthDate && newRow.city && newRow.address && newRow.phone && newRow.email) {
            axios.post("http://localhost:5000/students", newRow)
                .then(response => {
                    setStudents([...students, response.data]);
                    setNewRow({ name: '', lastName: '', cedula: '', birthDate: '', city: '', address: '', phone: '', email: '' });
                    setIsAdding(false);
                })
                .catch(error => console.error("Error al agregar estudiante:", error));
        }
    };

    const handleEditRow = (index) => {
        const updatedStudents = [...students];
        updatedStudents[index].isEditing = true;
        setStudents(updatedStudents);
    };

    const handleSaveRow = (index) => {
        const updatedStudents = [...students];
        updatedStudents[index].isEditing = false;
        setStudents(updatedStudents);
    };

    const handleDeleteRow = (index) => {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
    };

    const handleCancelEdit = (index) => {
        const updatedStudents = [...students];
        updatedStudents[index].isEditing = false;
        setStudents(updatedStudents);
    };

    const handleInputChange = (e, field, index) => {
        const value = e.target.value;
        const updatedStudents = [...students];
        updatedStudents[index][field] = value;
        setStudents(updatedStudents);
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
                                        <i className="fa fa-plus"></i> Agregar Nuevo
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Cedula</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Ciudad</th>
                                    <th>Dirección</th>
                                    <th>Teléfono</th>
                                    <th>Email</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>
                                            {student.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={student.name}
                                                    onChange={(e) => handleInputChange(e, 'name', index)}
                                                />
                                            ) : (
                                                student.name
                                            )}
                                        </td>
                                        <td>
                                            {student.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={student.lastName}
                                                    onChange={(e) => handleInputChange(e, 'lastName', index)}
                                                />
                                            ) : (
                                                student.lastName
                                            )}
                                        </td>
                                        <td>
                                            {student.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={student.cedula}
                                                    onChange={(e) => handleInputChange(e, 'cedula', index)}
                                                />
                                            ) : (
                                                student.cedula
                                            )}
                                        </td>
                                        <td>
                                            {student.isEditing ? (
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={student.birthDate}
                                                    onChange={(e) => handleInputChange(e, 'birthDate', index)}
                                                />
                                            ) : (
                                                student.birthDate
                                            )}
                                        </td>
                                        <td>
                                            {student.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={student.city}
                                                    onChange={(e) => handleInputChange(e, 'city', index)}
                                                />
                                            ) : (
                                                student.city
                                            )}
                                        </td>
                                        <td>
                                            {student.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={student.address}
                                                    onChange={(e) => handleInputChange(e, 'address', index)}
                                                />
                                            ) : (
                                                student.address
                                            )}
                                        </td>
                                        <td>
                                            {student.isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={student.phone}
                                                    onChange={(e) => handleInputChange(e, 'phone', index)}
                                                />
                                            ) : (
                                                student.phone
                                            )}
                                        </td>
                                        <td>
                                            {student.isEditing ? (
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={student.email}
                                                    onChange={(e) => handleInputChange(e, 'email', index)}
                                                />
                                            ) : (
                                                student.email
                                            )}
                                        </td>
                                        <td>
                                            {student.isEditing ? (
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
                                                value={newRow.lastName}
                                                onChange={(e) => setNewRow({ ...newRow, lastName: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newRow.cedula}
                                                onChange={(e) => setNewRow({ ...newRow, cedula: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={newRow.birthDate}
                                                onChange={(e) => setNewRow({ ...newRow, birthDate: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newRow.city}
                                                onChange={(e) => setNewRow({ ...newRow, city: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newRow.address}
                                                onChange={(e) => setNewRow({ ...newRow, address: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newRow.phone}
                                                onChange={(e) => setNewRow({ ...newRow, phone: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={newRow.email}
                                                onChange={(e) => setNewRow({ ...newRow, email: e.target.value })}
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

export default Estudiantes;
