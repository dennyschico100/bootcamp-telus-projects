import React, { useEffect, useState } from 'react';

const JsonCsv = () => {
  const [isInJsonCsvPath, setIsInJsonCsvPath] = useState(
    window.location.pathname.split('/')
  );
  const [state, setState] = useState({ defaultJson: '' });
  const exampleJson = [
    {
      id: 1,
      name: 'Johnson, Smith, and Jones Co.',
      amount: 345.33,
      comment: 'Pays on time',
    },
    {
      id: 2,
      name: 'Sam Mad Dog Smith',
      amount: 993.44,
      comment: '',
    },
    {
      id: 3,
      name: 'Barney & Company',
      amount: 0,
      comment: 'Great to work with and always pays with cash.',
    },
    {
      id: 4,
      name: "Johnson's Automotive",
      amount: 2344,
      comment: '',
    },
  ];
  const handleDefaultJson = (event) => {
    setState({ ...state, defaultJson: event.target.value });
  };
  useEffect(() => {
    if (isInJsonCsvPath[1] === 'json-csv') {
      document.body.style.background = '#e0f7f5';
    }
    //console.log(exampleJson);
    //console.log(JSON.stringify(exampleJson, null, 2));
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <h2 className="text-center">Convert Json to Csv</h2>
          <div className="col-md-6 offset-md-3">
            <label htmlFor="">JSON</label>
            <textarea
              className="form-control"
              placeholder="Dijita o pega tu json aqui..."
              id="exampleFormControlTextarea1"
              rows="10"
              value={state.defaultJson}
              onChange={handleDefaultJson}
            ></textarea>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn">Limpiar entrada</button>
              <button
                className="btn"
                onClick={() => {
                  //setExample(JSON.stringify(defaultJson));
                  setState({
                    defaultJson: JSON.stringify(exampleJson, null, 2),
                  });
                }}
              >
                Fomartear Json
              </button>
              <button
                className="btn "
                onClick={() => {
                  setState({
                    ...state,
                    defaultJson: JSON.stringify(exampleJson, null, 2),
                  });
                }}
              >
                Ver ejemplo{' '}
              </button>
            </div>
          </div>
          <div className="col-md-6 offset-md-3">
            <label htmlFor="">Resultado</label>
            <textarea
              className="form-control"
              placeholder=""
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default JsonCsv;
