import React, { Component } from "react";
import uuid from 'uuid';
import PropTypes from 'prop-types';

const stateInicial = {
  cita: {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  },
  error: false
}

class NuevaCita extends Component {
  state = {...stateInicial };

  handleChange = e => {
    //console.log(e.target.name + " : " + e.target.value);

    //Colocar lo que el usuario escribe en el state
    this.setState({
      cita: {
        ...this.state.cita,
        [e.target.name]: e.target.value
      }
    });
  };

  //Cuando el usuario envía el formulario
  handleSubmit = e => {
       e.preventDefault();

       //Extraer los valores del state
       const {mascota, propietario, fecha, hora, sintomas} = this.state.cita

       //Validar que todos los valores estén llenos
       if (mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === '') {
          this.setState({
               error: true
          });
          //detener ejecución con return
          return;            
       }

       //generar objeto con los datos
       const nuevaCita = {...this.state.cita};
       nuevaCita.id = uuid();

       //Agregar la cita del state de App
       this.props.crearNuevaCita(nuevaCita);

       // Colocar en el state el stateInicial
       this.setState({
         ...stateInicial
       })
  }

  render() {

    // Extraer valor del state
    const { error } = this.state;

    return (
      <div className="card mt-5 py-5">
        <div className="card-body">
          <h2 className="card-title text-center mb-5">
            Llena el formulario para crear una nueva cita
          </h2>

          { error ? 
          <span className="badge badge-danger mb-4 offset-md-9">
            Todos los campos son obligatorios
          </span>
          : null}

          <form
               onSubmit={this.handleSubmit}
          >
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Nombre Mascota
              </label>
              <div className="col-sm-8 col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Mascota"
                  name="mascota"
                  onChange={this.handleChange}
                  value={this.state.cita.mascota}
                />
              </div>
            </div>{" "}
            {/* cierra form-froup */}
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Nombre Dueño
              </label>
              <div className="col-sm-8 col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Dueño Mascota"
                  name="propietario"
                  onChange={this.handleChange}
                  value={this.state.cita.propietario}
                />
              </div>
            </div>{" "}
            {/* cierra form-froup */}
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
              <div className="col-sm-8 col-lg-4">
                <input
                  type="date"
                  className="form-control"
                  name="fecha"
                  onChange={this.handleChange}
                  value={this.state.cita.fecha}
                />
              </div>
              <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
              <div className="col-sm-8 col-lg-4">
                <input
                  type="time"
                  className="form-control"
                  name="hora"
                  onChange={this.handleChange}
                  value={this.state.cita.hora}
                />
              </div>
            </div>{" "}
            {/* cierra form-froup */}
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                síntomas
              </label>
              <div className="col-sm-8 col-lg-10">
                <textarea
                  className="form-control"
                  placeholder="Describe los Síntomas"
                  name="sintomas"
                  onChange={this.handleChange}
                  value={this.state.cita.sintomas}
                ></textarea>
              </div>
            </div>{" "}
            {/* cierra form-froup */}
            <input
              type="submit"
              className="py-3 mt-2 btn btn-primary btn-block"
              value="Agregar Nueva Cita"
            />
          </form>
        </div>
      </div>
    );
  }
}

NuevaCita.propTypes = {
  crearNuevaCita : PropTypes.func.isRequired
}

export default NuevaCita;
