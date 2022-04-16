import React, { useState, useEffect } from 'react';

const Secret = () => {
  const [state, setState] = useState({
    secret: '',
    showLink: false,
    showError: false,
    linkGenerated: '',
  });

  const saveLink = async () => {
    const obj = {
      secret: state.secret,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(options);

    const url = 'http://localhost:4000/api/secret/';
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = await response.json();
      setState({
        ...state,
        showLink: true,
        linkGenerated: 'localhost:3000/show-secret/' + data.link,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleStateSecret = (event) => {
    console.log(event.target.value);
    setState({
      ...state,
      secret: event.target.value,
    });
  };

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <>
      <div className="container">
        <h1 className="text-center">ONE TIME SECRET</h1>
        <div className="row mt-5">
          <div className="col-md-8 offset-md-2">
            <label htmlFor="">
              {' '}
              Puedes escribir aqui cualquier cosa ya sea una receta secreta, una
              ancecdota,etc.
            </label>
            {state.showLink && (
              <>
                <div className="d-flex flex-wrap justify-content-center   ">
                  <h4 className="mt-5">Tu Link</h4>
                  <strong className="alert alert-primary  text-justify">
                    {state.linkGenerated}
                  </strong>
                </div>
              </>
            )}
            <textarea
              className="form-control mt-3"
              placeholder="Dijita  aqui..."
              id="exampleFormControlTextarea1"
              rows="5"
              value={state.secret}
              onChange={(event) => {
                handleStateSecret(event);
              }}
            ></textarea>
            {state.showError && (
              <>
                <div className="alert alert-danger mt-2">
                  <label htmlFor="">El campo esta vacio !</label>
                </div>
              </>
            )}
            <button
              onClick={() => {
                saveLink();
              }}
              className="btn-crear-secreto mt-2"
            >
              Crear secreto
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Secret;
