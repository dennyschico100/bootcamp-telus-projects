import React from 'react';
import CardSlider from './CardSlider';
import './estilos.css';
const dataCardRender = [
  {
    name: 'Pomodoro',
    jumpTo: 'pomodoro',
    color: '#0c1c84',
    src: '',
  },
  {
    name: 'Masked Input ',
    jumpTo: 'masked-input',
    color: '#f07e0e',
    src: '',
  },
  {
    name: 'JSON to CSV',
    jumpTo: 'json-csv',
    color: '#009cde',
    src: '',
  },
  {
    name: 'URL Shortener',
    jumpTo: 'URL Shortener',
    color: '#de0000',
    src: '',
  },
  {
    name: 'One time Secret',
    jumpTo: 'One time Secret',
    color: '#de0000',
    src: '',
  },
];

function HomeMenu() {
  return (
    <div className="gallery" style={{ padding: '5%', border: '3px solid red' }}>
      {dataCardRender.map(({ name, src, jumpTo, color }, i) => (
        <div className="feature" key={name}>
          <CardSlider
            title={name}
            src={src}
            jumpTo={jumpTo}
            color={color}
            key={i}
          />
        </div>
      ))}
    </div>
  );
}

export default HomeMenu;
