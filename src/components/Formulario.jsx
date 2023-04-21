import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";

function Formulario() {
    const [formulario, setFormulario] = useState({
        nombre: '',
        cuantos: '',
        fecha: ''
    });

    const [datosTabla, setDatosTabla] = useState([]);

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleInputChange = (event) => {
        setFormulario({
            ...formulario,
            [event.target.name]: event.target.value
        });
    }

    const guardarReservacion = async (event) => {
        event.preventDefault();
        console.log(formulario);
        const docRef = await addDoc(collection(db, "reservaciones"), formulario);
        console.log("Documento agregado con el ID", docRef.id);
        limpiarFormulario();
    };

    const limpiarFormulario = () => {
        setFormulario(
            {
                nombre: '',
                cuantos: '',
                fecha: ''
            }
        );
        console.log(formulario);
    }

    // Esto es la version clasica ocupas recargar los datos por codigo...
    // const cargarDatos = async () => {
    //     console.log("Entro a cargar datos...");
    //     const querySnapshot = await getDocs(collection(db, "reservaciones"));
    //     let datosFormateados = querySnapshot.docs.map((doc) => {
    //         return doc.data();
    //     });
    //     setDatosTabla(datosFormateados);
    //     console.log(datosFormateados);
    // }

    // Esta es la version recarga automatica
    const cargarDatos = async () => {
        console.log("Entro a cargar datos...");
        onSnapshot(collection(db, "reservaciones"), (querySnapshot) => {
            // order by date
            console.log("detected changes");
            let rawReservaciones = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }).sort((a, b) => {
                return new Date(a.fecha) - new Date(b.fecha);
            });
            console.log(rawReservaciones);
            setDatosTabla(rawReservaciones);
        });
    }


    return (
        <>
            <form onSubmit={guardarReservacion}>
                <div className="mb-3">
                    <label className="form-label">Nombre de quien reserva</label>
                    <input type="text" className="form-control" name='nombre' onChange={handleInputChange} />
                    <div className="form-text text-danger fw-bold">Esta persona debe presentarse el dia de la cita.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label"> Para cuantas personas?</label>
                    <input type="text" className="form-control" name='cuantos' onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha reserva</label>
                    <input type="date" className="form-control" name='fecha' onChange={handleInputChange} />
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
            </form>
            <hr />
            <h2 className='mt-4 text-center'>Lista de reservaciones</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Personas</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datosTabla.map((renglon, index) => {
                            return (
                            <tr key={renglon.id}>
                                <td>{renglon.id}</td>
                                <td>{renglon.nombre}</td>
                                <td>{renglon.cuantos}</td>
                                <td>{renglon.fecha}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export default Formulario;