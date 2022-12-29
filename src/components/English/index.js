import React, { useEffect, useState } from 'react';
import './style.css';
const EnglishApp = () => {
  const words = [
    'research',
    'realize',
    'counter',
    'concern',
    'despite',
    'certainly',
    'hopeful',
    'involved',
    'guarantee',
    'meantime',
    'assuming',
    'tabs',
    'deal',
    'acknowledged',
    'issue',
    'surprise',
    'stark',
    'campaign',
    'delinquent',
    'summoning',
    'appearance',
    'murder',
    'bottomless',
    'perseverance',
    'tilting',
    'worthless',
    'mess',
    'beyond',
    'nevertheless',
    'foremost',
    'witnessing',
    'slightly',
    'unpredictable',
    'loops',
    'maneuver',
    'plot',
    'flawed',
    'proof',
    'rebirth',
    'brief',
    'briefly',
    'argument',
    'defund',
    'notwithstanding',
    'afford',
    'obviously',
    'delayed',
    'announcement',
    'wannabe',
    'newfound',
    'anger',
    'spiteful',
    'groundwork',
    'grudge',
    'prideful',
    'mayhem',
    'prior',
    'scattered',
    'seldom',
    'perpetrate',
    'emphasis',
    'cautiously',
    'unguessable',
    'provide',
    'entirely',
    'fiance',
    'evidence',
    'dubious',
    'harmless',
    'inconclusive',
    'refuse',
    'mercy',
    'glimpses',
    'harmful',
    'salty',
    'guilty',
    'illness',
    'selfish',
    'courage',
    'wisdom',
    'zestful',
    'shelf',
    'drug',
    'wases',
    'envelope',
    'crowded',
    'signature',
    'fan',
    'consequence',
    'scholarship',
    'fund',
    'defendant',
    'juror',
    'testify',
    'trial',
    'lawsuit',
    'prosecutor',
    'alibi',
    'excuse',
    'brave',
    'insist',
    'weakness',
    'bitter',
    'sensible',
    'coworker',
    'managment',
    'bridesmaid',
    'ancestor',
    'supplies',
    'prosperous',
    'constanly',
    'greatly',
    'discuss',
    'features',
    'invest',
    'donate',
    'footstep',
    'pretend',
    'wine',
    'fence',
    'stage',
    'presence',
    'deliberately',
    'anxiety',
    'ironically',
    'arrests',
    'wee',
    'assassinated',
    'controversy',
    'survey',
    'unlikely',
    'withstand',
    'dozens',
    'hill',
    'insurance',
    'slumps',
    'exchange',
    'downturns',
    'previously',
    'unforeseen',
    'likely',
    'spectacularly',
    'catastrophe',
    'failure',
    'adequate',
    'struggling',
    'proclamation',
    'approve',
    'elect',
    'participate',
    'rivalry',
    'intense',
    'achieve',
    'lucrative',
    'proper',
    'sums',
    'luxurious',
    'highlighted',
    'grave',
    'consider',
    'server',
    'sponsor',
    'suspect',
    'craft',
    'sleepily',
    'breathing',
    'cheer',
    'approached',
    'beaming',
    'humorously',
    'childish',
    'breath',
  ];
  const spanish = [
    'investigacion',
    'darse cuenta ',
    'contrarestar',
    'animar',
    'a pesar de ',
    'ciertamente',
    'esperanzado',
    'envuelto',
    'garantia(verb)',
    'mientras tanto',
    'asumiendo',
    'pestaña',
    'trato',
    'admitido',
    'asunto',
    'sorpresa',
    'rigido',
    'campaña',
    'delincuente',
    'invocando',
    'apariencia',

    'asesinato',
    'sin fondo',
    'peseverancia',
    'inclinando',
    'sin valor',
    'lio',
    'mas alla ',
    'sin embargo',
    'principal primero',
    'testificar-testigo',
    'ligeramente',
    'impredecible',
    'bucles',
    'maiobra',
    'trama-argumento',
    'defectuoso',
    'prueba-demostracion',
    'renacer',
    'breve',
    'brevemente',
    'argumento',
    'desvanecer',
    'sin embargo',
    'pagar ',
    'obviamente',
    'retrasado',
    'anuncio-anunciamiento',
    'aspirante',
    'recien descubieto',
    'enojo-colera',

    'malevolo',
    'trabajo preparatorio ',
    'resentimiento',
    'orgulloso',
    'violencia',
    'anterior',
    'disperso',
    'raramente',
    'perpetrar',
    'enfasis',
    'cautelosamente',
    'indescriptible',
    'proporcionar',
    'en su totalidad',
    'prometido',
    'evidencia',
    'dudoso',
    'inofensivo',
    'inconcluso',
    'desperdicio,basura-desechos',
    'misericordia',
    'destellos',
    'dañino',
    'salado',
    'culpable',
    'emfermedad',
    'tacaño',
    'corage',
    'sabiduria',
    'entusiasta',
    'estante',
    'droga',
    'desperdicios',
    'sobre',
    'lleno de gente',
    'firma',
    'ventilador',
    'consecuencia',
    'beca',
    'fondo-base,-costear-financiar',
    'acusado',
    'jurado',
    'testificar',
    'juicio-audiencia',
    'demanda',
    'fiscal',
    'alegar-coartada',
    'excusa',
    'valiente',
    'insistir',
    'debilidad',
    'amargo',
    'sensible',
    'compañero de trabajo',
    'gestion',
    'dama de honor',
    'ancestro',
    'suministros',
    'prospero',
    'constantemente',
    'muy-extremadamente',
    'discutir',
    'caracteristicas',
    'invertir',
    'donar',
    'pisada',
    'pretender',
    'vino',
    'cerca-valla',
    'fase',
    'presencia',
    'deliveradamente',
    'ansiedad',
    'ironicamente',
    'arrestos',
    'pequeñito',
    'asesinado',
    'controversial',
    'encuesta',
    'improbable',
    'resistir a',
    'docenas',
    'colina',
    'seguro',
    'desplomes',
    'intercambiar',
    'recesion',
    'previamente',
    'imprevisto',
    'probable',
    'espectacularmente',
    'catastrofe',
    'fallar-fracaso',
    'adecuar',
    'luchando',
    'proclamacion',
    'aprobar',
    'electo',
    'participar',
    'rivalidad',
    'intenso',
    'logra-conseguir',
    'lucartivo',
    'apropiado',
    'sumas',
    'lujoso',
    'resaltado',
    'tumba',
    'considerar',
    'servir',
    'patrocinador',
    'sospechar',
    'arte',
    'soñolientamente',
    'respiracion',
    'animar',
    'acercado ',
    'radiante',
    'humoristicamente',
    'infantil',
    'respiro',
  ];

  const phrasals = [
    'set out ',
    'drop off ',
    'find out',
    'came up with',
    'catch up with',
    'take off',
    'put on',
  ];

  const phrasalSpanish = [
    'partir',
    'dejar',
    'descubrir',
    'proponer',
    'ponerse al dia',
    'despegar',
    'poner',
  ];
  const obj = {
    secret: '',
  };

  //const jsQuestions = require('./jsquestions.json');
  //console.log(jsQuestions);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('words');
  const [wordInput, setWordInput] = useState('');
  const [spanishInput, setSpanishInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({ data: [] });
  const [items, setItems] = useState([
    { label: 'WORDS', value: 'words' },
    { label: 'PHRASAL VERBS', value: 'phrasal' },
    { label: 'PERSONALITY', value: 'personality' },
    { label: 'DESCRIBE  PEOPLE', value: 'people' },
    { label: 'javascript', value: 'js' },
  ]);

  function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  const getData = async () => {
    try {
      setState({ data: [] });
      setIsLoading(true);

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      console.log(options);

      const url = 'https://api-bootcam.onrender.com/api/' + value;
      const response = await fetch(url, options);
      if (value === 'js') {
      }
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      let results = [];

      for (let index = 0; index < 5; index++) {
        let generatedNumber = generateRandomInteger(data.length);
        console.error(data[generatedNumber]);
        results.push(data[generatedNumber]);
      }
      console.log('FINAL RESULT TO SHOW');
      setState({ data: results });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  /*const saveData = async () => {
    if (phrasalSpanish.length === phrasals.length) {
      let arrObj = [];
      const iterations = jsQuestions.length;
      for (let index = 0; index < iterations; index++) {
        let wordObj = {
          word: jsQuestions[index].question,
          spanish: jsQuestions[index].answer,
        };
        arrObj.push(wordObj);
      }
      const finalObj = {
        data: arrObj,
      };
      const options = {
        method: 'POST',
        body: JSON.stringify(finalObj),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        console.log(options);
        console.log(finalObj);
        const url = 'http://localhost:3000/api/phrasal/saveFirstTime';
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };*/
  const saveData = async () => {
    setIsLoading(true);
    const finalObj = {
      word: wordInput,
      spanish: spanishInput,
    };
    if (value === 'js') {
      //jsQuestions.forEach((element) => {});
    } else {
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(finalObj),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      console.log(options);
      console.log(finalObj);
      const url = 'https://api-bootcam.onrender.com/api/';
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();
      console.log(data);
      setIsLoading(!true);
    } catch (error) {
      console.log(error);
      setIsLoading(!true);
    }
  };
  const handleSpanishInput = async (event) => {
    console.log(event.target.value);
    setSpanishInput(event.target.value);
  };
  const handleWordInput = async (event) => {
    console.log(event.target.value);
    setWordInput(event.target.value);
  };
  useEffect(() => {
    console.log('updated ' + value);
  }, [value]);

  return (
    <div className="container">
      <div className="row mt-1">
        <div
          className="col-md-6 d-flex flex-wrap justify-content-between col-12 offset-md-3"
          style={{ border: 'px solid red' }}
        >
          <select
            onChange={(event) => {
              setValue(event.target.value);
            }}
          >
            {items.map((element) => {
              return (
                <option key={element?.value} value={element?.value}>
                  {element.label}
                </option>
              );
            })}
          </select>
          <button onClick={getData} className="btn" color="#841584">
            Generate data
          </button>
        </div>
      </div>

      <div className="row">
        <div className=" d-flex flex-wrap justify-content-between col-12 ">
          <div className="mt-1" style={{ border: 'px solid red' }}>
            {state?.data.map((element) => {
              return (
                <li
                  style={{
                    listStyle: 'none',
                    borderBottom: '1px solid #037e8c',
                  }}
                  className=""
                  key={element?._id}
                >
                  {element.word}
                </li>
              );
            })}
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <strong> Save your new vocabulary</strong>
          <div className="form-group">
            <input
              className="mb-3 mt-3 "
              type="text"
              value={wordInput || ''}
              onChange={(event) => {
                handleWordInput(event);
              }}
              placeholder="English word/phrasal-verb"
            />
            <input
              value={spanishInput}
              className="mb-3"
              onChange={(event) => {
                handleSpanishInput(event);
              }}
              placeholder="Spanish meaning"
            />
          </div>
          <button
            color="#841584"
            className="btn mt-3 "
            disabled={spanishInput === '' || wordInput === ''}
            onClick={saveData}
          >
            Sava Data
          </button>
        </div>
      </div>
      <div>{isLoading && <ActivityIndicator />}</div>
    </div>
  );
};

const ActivityIndicator = () => {
  return <div className="lds-hourglass"></div>;
};
export default EnglishApp;
