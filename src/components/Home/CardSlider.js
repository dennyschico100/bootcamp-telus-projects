import React from 'react';

function CardSlider({ className, title, src, jumpTo, color }) {
  // console.log("colors--", color)
  return (
    <div
      className={'slider-card border-0  shadow-main-slider-card ' + className}
    >
      <div className="slider-card-body ">
        <img
          src="https://cdn.searchenginejournal.com/wp-content/uploads/2019/07/the-essential-guide-to-using-images-legally-online-1520x800.png"
          alt={'infrasal ' + title}
          className="img-fluid"
        />
        <span className="">
          <a href={jumpTo} className="text-center">
            {'referencia'}
          </a>
        </span>
      </div>
      {/*
      <div className="card-footer " style={{ backgroundColor: color[0] }}>
        <div className="">
          <span>{title}</span> 
          <div className="d-flex justify-content-between">
            <a href={jumpTo}> Ingresar</a>
            <div className="icon-link">
              <span className="fas fa-chevron-right icon-size-xs icon-link-span"></span>
            </div>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}

export default CardSlider;
