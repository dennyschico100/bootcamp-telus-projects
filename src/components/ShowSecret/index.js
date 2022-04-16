import React, { useState, useEffect } from 'react';

const ShowSecret = () => {
  const [state, setState] = useState({
    secret: '',
    showSecret: false,
    errorMessage: '',
    buttonDisabled: false,
  });
  const isInShowSecretPath =
    window.location.pathname.split('/')[1] === 'show-secret';

  useEffect(async () => {
    const id = window.location.pathname;
    let charPosition = id.indexOf('t');
    charPosition += 2;
    const param = id.substring(charPosition, id.length);

    const URL = 'http://localhost:4000/api/secret/?link=' + param;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      console.log(URL);

      const response = await fetch(URL, options);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      if (!data.secret) {
        setState({
          ...state,
          errorMessage: data.message,
          buttonDisabled: true,
        });
        console.log(data.message);
      } else {
        setState({ ...state, secret: data.secret });
      }
    } catch (error) {
      throw new Error(error);
    }
  }, []);
  const handleSecret = () => {};
  const updateSecret = async () => {
    try {
      setState({ ...state, showSecret: true });
      const id = window.location.pathname;
      let charPosition = id.indexOf('t');
      charPosition += 2;
      const param = id.substring(charPosition, id.length);

      const URL = 'http://localhost:4000/api/secret/?link=' + param;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      console.log(URL);

      const response = await fetch(URL, options);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const data = await response.json();
      console.error(data);
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <span>
              <strong>Nota: </strong>El secreto solo puede ser visualizado una
              vez
            </span>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            {state.errorMessage !== '' && (
              <>
                <div>
                  <strong className="alert alert-warning">
                    {state.errorMessage}
                  </strong>
                </div>
              </>
            )}
            {state.showSecret && (
              <>
                <div className="secret-container">
                  <strong>Tu secreto</strong>
                  <textarea
                    className="form-control mt-3"
                    value={state?.secret || ''}
                    onChange={handleSecret}
                  ></textarea>
                </div>
              </>
            )}
            <button
              disabled={state.buttonDisabled}
              className="form-control btn mt-5"
              onClick={() => {
                updateSecret();
              }}
            >
              Ver secreto{' '}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowSecret;
