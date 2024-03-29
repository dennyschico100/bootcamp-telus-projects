import React, { useState, useEffect } from 'react';
import { Formik, useFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import { months } from './DatePicker';
import DatePicker from './DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
const phoneReg = /^[0-9]{8}$/;
const identifiacionReg = /^[0-9]{9}$/;
const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;

const years = [
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
];
const MaskedInput = () => {
  const [state, setState] = useState({
    cardType: '',
    fillEmergencyFields: false,
  });
  const [isInMaskedInputPath, setIsInMaskedInputPath] = useState(
    window.location.pathname.split('/')
  );

  const handleCardType = (e) => {
    /*let cardTypeSelection =
      e.target.value === 'Visa' ? '/^[0-9]{9}$/' : '/^(?:5[1-5][0-9]{14})$/';
    console.error(cardTypeSelection);*/
    setState(() => {
      return {
        cardType:
          e.target.value === 'Visa'
            ? /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
            : /^(?:5[1-5][0-9]{14})$/,
      };
    });
  };

  useEffect(() => {
    console.log('use effect');
    console.log(state);
  }, [state]);

  if (isInMaskedInputPath[1] === 'masked-input') {
    document.body.style.background =
      'linear-gradient(to top, #ff9671, #9198e5)';
  }
  const validationSchema = yup.object().shape({
    nombres: yup
      .string()
      .min(3, 'Ingresa al menos 3 caracteres')
      .required('Completa este campo'),
    primerApellido: yup
      .string()
      .min(3, 'Ingresa al menos 3 caracteres')
      .required('Completa este campo'),
    segundoApellido: yup
      .string()
      .min(3, 'Ingresa al menos 3 caracteres')
      .required('Completa este campo'),
    fechaNacimiento: yup.date().required('Completa este campo'),
    email: yup.string().email('Email invalido').required('Completa este campo'),
    direccion: yup
      .string()
      .min(3, 'Ingresa al menos 10 caracteres')
      .required('Completa este campo'),
    codigoMarcado: yup.string().required('Completa este campo'),
    numeroTelefono: yup
      .string()
      .matches(phoneReg, 'Numero de telefono invalido')
      .required('Completa este campo'),
    telefonoCasa: yup.string().matches(phoneReg, 'Numero de telefono invalido'),
    identificacionPersonal: yup
      .string()
      .matches(
        identifiacionReg,
        'Identificacion personal invalida, ingresa 9 digitos'
      ),
    pasaporte: yup
      .string()
      .matches(phoneReg, 'Formato invalido')
      .required('Completa este campo'),
    tipoTarjeta: yup.string().required('Selecciona  el tipo de tarjeta'),
    tarjetaCredito: yup
      .string()
      .matches(state.cardType, 'Formato invalido' + state.cardType)
      .required('Completa este campo'),
    expireMonth: yup.string().required('Selecciona'),
    expireYear: yup.string().required('Selecciona '),
    cvc: yup
      .string()
      .max(3, 'Ingresa solo 3 digitos')
      .required('Completa este campo'),
    nombresEmergencia: yup
      .string()
      .min(3, 'Ingresa al menos 3 caracteres')
      .required('Completa este campo'),
    primerApellidoEmergencia: yup
      .string()
      .min(3, 'Ingresa al menos 3 caracteres')
      .required('Completa este campo'),
    emailEmergencia: yup
      .string()
      .email('Email invalido')
      .required('Completa este campo'),
    direccionEmergencia: yup
      .string()
      .min(3, 'Ingresa al menos 10 caracteres')
      .required('Completa este campo'),
    segundoApellidoEmergencia: yup
      .string()
      .min(3, 'Ingresa al menos 3 caracteres')
      .required('Completa este campo'),
    fechaNacimientoEmergencia: yup.date().required('Completa este campo'),
    codigoMarcadoEmergencia: yup.string().required('Completa este campo'),
    numeroTelefonoEmergencia: yup
      .string()
      .matches(phoneReg, 'Numero de telefono invalido')
      .required('Completa este campo'),
  });
  /*let today = new Date();
  const month = new String(today.getMonth() + 1);

  const realMonth = month.length === 1 ? '0' + month : month;

  let fecha = today.getFullYear() + '-' + realMonth + '-' + today.getDate();
  console.log(today.getMonth());*/

  return (
    <>
      <div className="container " style={{ border: 'px solid red' }}>
        <Formik
          initialValues={{
            nombres: '',
            primerApellido: '',
            segundoApellido: '',
            fechaNacimiento: new Date(),
            email: '',
            direccion: '',
            codigoMarcado: '',
            numeroTelefono: '',
            telefonoCasa: '',
            identificacionPersonal: '',
            pasaporte: '',
            tipoTarjeta: '',
            tarjetaCredito: '',
            expireMonth: '',
            expireYear: '',
            cvc: '',
            nombresEmergencia: '',
            primerApellidoEmergencia: '',
            segundoApellidoEmergencia: '',
            fechaNacimientoEmergencia: new Date(),
            emailEmergencia: '',
            direccionEmergencia: '',
            codigoMarcadoEmergencia: '',
            numeroTelefonoEmergencia: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            alert('enviado');
          }}
        >
          {({
            isSubmitting,
            values,
            setFieldValue,
            handleChange,
            errors,
            touched,
            resetForm,
          }) => (
            <Form id="masked-form" className=" col-md-6 offset-md-3  ">
              <div className="row  mt-3">
                <h2 className="text-center">REGISTRO</h2>

                <div className="form-group col-md-6 col-12">
                  <label className="col-form-label" htmlFor="">
                    Nombre
                  </label>
                  <input
                    className="form-control border-1 border-secondary"
                    name="nombres"
                    type="text"
                    value={values.nombres}
                    onChange={handleChange}
                  />
                  {errors.nombres && touched.nombres ? (
                    <span className="text-danger">{errors.nombres}</span>
                  ) : null}
                </div>
                <div className="form-group col-md-6 col-12 ">
                  <label className="col-form-label" htmlFor="">
                    Primer Apellido
                  </label>
                  <input
                    className="form-control"
                    name="primerApellido"
                    onChange={handleChange}
                    type="text"
                    value={values.primerApellido}
                  />
                  {errors.primerApellido && touched.primerApellido ? (
                    <span className="text-danger">{errors.primerApellido}</span>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 col-12">
                  <label className="col-form-label" htmlFor="">
                    Segundo Apellido
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="segundoApellido"
                    onChange={handleChange}
                    value={values.segundoApellido}
                  />
                  {errors.segundoApellido && touched.segundoApellido ? (
                    <span className="text-danger">
                      {errors.segundoApellido}
                    </span>
                  ) : null}
                </div>
                <div className="form-group col-md-6 col-12">
                  <label className="col-form-label" htmlFor="">
                    Fecha de nacimiento
                  </label>
                  <DatePicker
                    selected={values.fechaNacimiento}
                    dateFormat="MMMM d, yyyy"
                    className="form-control col-md-3 col-12"
                    name="fechaNacimiento"
                    onChange={(date) => setFieldValue('fechaNacimiento', date)}
                  />
                  {errors.fechaNacimiento && touched.fechaNacimiento ? (
                    <span className="text-danger">
                      {errors.fechaNacimiento}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 col-12">
                  <label className="col-form-label" htmlFor="">
                    Email
                  </label>
                  <input
                    className="form-control"
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <span className="text-danger">{errors.email}</span>
                  ) : null}
                </div>
                <div className="form-group col-md-6 col-12">
                  <label className="col-form-label" htmlFor="">
                    Direccion
                  </label>
                  <input
                    className="form-control"
                    name="direccion"
                    type="text"
                    value={values.direccion}
                    onChange={handleChange}
                  />
                  {errors.direccion && touched.direccion ? (
                    <span className="text-danger">{errors.direccion}</span>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className=" col-md-6 ">
                  <div>
                    {' '}
                    <label className="col-form-label" htmlFor="">
                      Telefono
                    </label>
                  </div>
                  <div className="row">
                    {' '}
                    <div className="col-md-6">
                      <select
                        className="form-control"
                        name="codigoMarcado"
                        onChange={handleChange}
                      >
                        {' '}
                        <option value="" defaultValue="">
                          Seleccione
                        </option>
                        <option value="503">503</option>
                        <option value="502">502</option>
                      </select>
                      {errors.codigoMarcado && touched.codigoMarcado ? (
                        <span className="text-danger">
                          {errors.codigoMarcado}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-sm-6 col-12 col-md-6">
                      <input
                        className="form-control"
                        name="numeroTelefono"
                        type="text"
                        value={values.numeroTelefono}
                        onChange={handleChange}
                      />
                      {errors.numeroTelefono && touched.numeroTelefono ? (
                        <span className="text-danger">
                          {errors.numeroTelefono}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-6 col-12">
                  <label className="col-form-label" htmlFor="">
                    Telefono de casa
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="telefonoCasa"
                    onChange={handleChange}
                    value={values.telefonoCasa}
                  />
                  {errors.telefonoCasa && touched.telefonoCasa ? (
                    <strong className="text-danger">
                      {errors.telefonoCasa}
                    </strong>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12 col-md-6  pt-1 pb-1">
                  <label htmlFor="">Identificacion personal</label>
                  <input
                    type="text"
                    className="form-control"
                    name="identificacionPersonal"
                    onChange={handleChange}
                    value={values.identificacionPersonal}
                  />
                  {errors.identificacionPersonal &&
                  touched.identificacionPersonal ? (
                    <span className="text-danger">
                      {errors.identificacionPersonal}
                    </span>
                  ) : null}
                </div>
                <div className="form-group col-12 col-md-6  pt-1 pb-1">
                  <label htmlFor="">Pasaporte</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pasaporte"
                    onChange={handleChange}
                    value={values.pasaporte}
                  />
                  {errors.pasaporte && touched.pasaporte ? (
                    <span className="text-danger">{errors.pasaporte}</span>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12 col-md-6 pt-1 pb-1">
                  <label style={{ marginRight: '10px' }} htmlFor="">
                    Tipo tarjeta{' '}
                  </label>
                  <select
                    id=""
                    className=""
                    name="tipoTarjeta"
                    onChange={handleChange}
                    onBlur={handleCardType}
                  >
                    <option value="" defaultValue="">
                      Selecciona
                    </option>
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                  </select>
                  {errors.tipoTarjeta && touched.tipoTarjeta ? (
                    <span className="text-danger">{errors.tipoTarjeta}</span>
                  ) : null}
                </div>
                <div className="form-group col-12 col-md-6 pt-1 pb-1">
                  <label htmlFor="">Numero de tarjeta</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tarjetaCredito"
                    onChange={handleChange}
                    value={values.tarjetaCredito}
                    placeholder="0000 0000 0000 0000"
                  />
                  {errors.tarjetaCredito && touched.tarjetaCredito ? (
                    <span className="text-danger">{errors.tarjetaCredito}</span>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className=" col-md-6 pt-1 pb-1 ">
                  <div>
                    {' '}
                    <div className="d-flex flex-wrap justify-content-around align-items-end">
                      <label className="" htmlFor="">
                        Mes
                      </label>
                      <label className="" htmlFor="">
                        Año
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    {' '}
                    <div className="col-md-6">
                      <select
                        className="form-control"
                        name="expireMonth"
                        onChange={handleChange}
                      >
                        <option value="">Selecciona</option>
                        {months.map((month) => {
                          return (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          );
                        })}
                      </select>
                      {errors.expireMonth && touched.expireMonth ? (
                        <span className="text-danger">
                          {errors.expireMonth}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-sm-6 col-12 col-md-6">
                      <select
                        id=""
                        className="form-control"
                        name="expireYear"
                        onChange={handleChange}
                      >
                        <option value="">Selecciona</option>
                        {years.map((year) => {
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                      {errors.expireYear && touched.expireYear ? (
                        <span className="text-danger">{errors.expireYear}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="form-group col-12 col-md-6  pt-1 pb-1">
                  <label htmlFor="">CVC</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cvc"
                    onChange={handleChange}
                    value={values.cvc}
                  />
                  {errors.cvc && touched.cvc ? (
                    <span className="text-danger">{errors.cvc}</span>
                  ) : null}
                </div>
              </div>
              <div className="row pt-5 pb-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="">Datos de emergencia</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="checkbox"
                    className=""
                    onChange={() => {
                      setState({
                        ...state,
                        fillEmergencyFields: !state.fillEmergencyFields,
                      });
                    }}
                  />
                </div>
              </div>
              {state.fillEmergencyFields && (
                <>
                  <div className="row">
                    <div className="form-group col-md-6 col-12">
                      <label className="col-form-label" htmlFor="">
                        Nombre
                      </label>
                      <input
                        className="form-control border-1 border-secondary"
                        name="nombresEmergencia"
                        type="text"
                        value={values.nombresEmergencia}
                        onChange={handleChange}
                      />
                      {errors.nombresEmergencia && touched.nombresEmergencia ? (
                        <span className="text-danger">
                          {errors.nombresEmergencia}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6 col-12 ">
                      <label className="col-form-label" htmlFor="">
                        Primer Apellido
                      </label>
                      <input
                        className="form-control"
                        name="primerApellidoEmergencia"
                        onChange={handleChange}
                        type="text"
                        value={values.primerApellidoEmergencia}
                      />
                      {errors.primerApellidoEmergencia &&
                      touched.primerApellidoEmergencia ? (
                        <span className="text-danger">
                          {errors.primerApellidoEmergencia}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-12">
                      <label className="col-form-label" htmlFor="">
                        Segundo Apellido
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="segundoApellidoEmergencia"
                        onChange={handleChange}
                        value={values.segundoApellidoEmergencia}
                      />
                      {errors.segundoApellidoEmergencia &&
                      touched.segundoApellidoEmergencia ? (
                        <span className="text-danger">
                          {errors.segundoApellidoEmergencia}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6 col-12">
                      <label className="col-form-label" htmlFor="">
                        Fecha de nacimiento
                      </label>
                      <DatePicker
                        selected={values.fechaNacimientoEmergencia}
                        dateFormat="MMMM d, yyyy"
                        className="form-control col-md-3 col-12"
                        name="fechaNacimientoEmergencia"
                        onChange={(date) =>
                          setFieldValue('fechaNacimiento', date)
                        }
                      />
                      {errors.fechaNacimientoEmergencia &&
                      touched.fechaNacimientoEmergencia ? (
                        <span className="text-danger">
                          {errors.fechaNacimientoEmergencia}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-12">
                      <label className="col-form-label" htmlFor="">
                        Email
                      </label>
                      <input
                        className="form-control"
                        name="emailEmergencia"
                        type="text"
                        value={values.emailEmergencia}
                        onChange={handleChange}
                      />
                      {errors.emailEmergencia && touched.emailEmergencia ? (
                        <span className="text-danger">
                          {errors.emailEmergencia}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6 col-12">
                      <label className="col-form-label" htmlFor="">
                        Direccion
                      </label>
                      <input
                        className="form-control"
                        name="direccionEmergencia"
                        type="text"
                        value={values.direccionEmergencia}
                        onChange={handleChange}
                      />
                      {errors.direccionEmergencia &&
                      touched.direccionEmergencia ? (
                        <span className="text-danger">
                          {errors.direccionEmergencia}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className=" col-md-12 ">
                      <div>
                        {' '}
                        <label className="col-form-label" htmlFor=""></label>
                      </div>{' '}
                      Telefono
                      <div className="row">
                        {' '}
                        <div className="col-md-6">
                          <select
                            className="form-control"
                            name="codigoMarcadoEmergencia"
                            onChange={handleChange}
                          >
                            {' '}
                            <option value="" defaultValue="">
                              Seleccione
                            </option>
                            <option value="503">503</option>
                            <option value="502">502</option>
                          </select>
                          {errors.codigoMarcadoEmergencia &&
                          touched.codigoMarcadoEmergencia ? (
                            <span className="text-danger">
                              {errors.codigoMarcadoEmergencia}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-sm-6 col-12 col-md-6">
                          <input
                            className="form-control"
                            name="numeroTelefonoEmergencia"
                            type="text"
                            value={values.numeroTelefonoEmergencia}
                            onChange={handleChange}
                          />
                          {errors.numeroTelefonoEmergencia &&
                          touched.numeroTelefonoEmergencia ? (
                            <span className="text-danger">
                              {errors.numeroTelefonoEmergencia}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="row pb-3">
                <div className="col-md-8 offset-md-2  d-flex justify-content-between mt-3">
                  <button className="mt-3 col-5   btn-enviar" type="submit">
                    Enviar
                  </button>
                  <button
                    className="mt-3 col-5 btn-enviar"
                    type="button"
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    Limpiar
                  </button>
                </div>
              </div>

              <pre className="d-none col-md-4 mt-5">
                {JSON.stringify(values, null, 2)}
              </pre>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default MaskedInput;
