import React, { useEffect, useState, useRef } from 'react';

const JsonCsv = () => {
  const [isInJsonCsvPath, setIsInJsonCsvPath] = useState(
    window.location.pathname.split('/')
  );
  const [state, setState] = useState({ defaultJson: '', csv: '' });

  const download = useRef(null);

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
  const handleCsv = () => {};
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
              <button
                className="btn"
                onClick={() => {
                  setState({ defaultJson: '' });
                }}
              >
                Limpiar entrada
              </button>
              {/*<button
                className="btn"
                onClick={() => {
                  //setExample(JSON.stringify(defaultJson));
                  setState({
                    defaultJson: JSON.stringify(exampleJson, null, 2),
                  });
                }}
              >
                Fomartear Json
              </button> */}
              <button
                className="btn"
                onClick={() => {
                  let json = JSON.parse(state.defaultJson);

                  console.log(typeof json);
                  let csv = json.map((row) => Object.values(row));
                  csv.unshift(Object.keys(json[0]));
                  let finalCsv = `"${csv.join('"\n"').replace(/,/g, '","')}"`;
                  console.log(finalCsv);
                  setState({ ...state, csv: finalCsv });
                }}
              >
                Convertir
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
              value={state.csv}
              onChange={handleCsv}
            ></textarea>
            <a
              className="btn mt-2"
              ref={download}
              onClick={() => {
                const url = window.URL.createObjectURL(new Blob([state.csv]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `FileName.csv`);

                document.body.appendChild(link);

                link.click();
              }}
            >
              Descargar
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default JsonCsv;
