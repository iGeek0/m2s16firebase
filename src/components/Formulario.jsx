import { useState } from 'react';
import {db} from '../services/firebase';
import {collection, addDoc} from "firebase/firestore";

function Formulario() {
    const [formulario, setFormulario] = useState({
        nombre: '',
        cuantos: '',
        fecha: ''
    });

    const handleInputChange = (event) => {
        setFormulario({
            ...formulario,
            [event.target.name]: event.target.value
        });
    }

    const guardarReservacion = async (event)=> {
        event.preventDefault();
        console.log(formulario);
        const docRef = await addDoc(collection(db, "reservaciones"), formulario);
        console.log("Documento agregado con el ID", docRef.id);
        limpiarFormulario();
    };

    const limpiarFormulario = ()=> {
        setFormulario(
            {
                nombre: '',
                cuantos: '',
                fecha: ''
            }
        );
        console.log(formulario);
    }

    return (
        <form onSubmit={guardarReservacion}>
            <div className="mb-3">
                <label className="form-label">Nombre de quien reserva</label>
                <input type="text" className="form-control" name='nombre' onChange={handleInputChange}/>
                <div className="form-text text-danger fw-bold">Esta persona debe presentarse el dia de la cita.</div>
            </div>
            <div className="mb-3">
                <label className="form-label"> Para cuantas personas?</label>
                <input type="text" className="form-control" name='cuantos' onChange={handleInputChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha reserva</label>
                <input type="date" className="form-control" name='fecha' onChange={handleInputChange}/>
            </div>

            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
}

export default Formulario;