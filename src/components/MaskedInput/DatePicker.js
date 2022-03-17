import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import { registerLocale } from 'react-datepicker';

registerLocale(es);
export const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
const CustomDatePicker = (props) => {
  return (
    <>
      <DatePicker
        locale={es}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="input-group input-group-sm input-group-calender">
            <div className="input-group-prepend">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  decreaseMonth();
                }}
                disabled={prevMonthButtonDisabled}
                className="btn btn-outline-secondary"
                type="button"
              >
                {'<'}
              </button>
            </div>

            <input
              type="number"
              onChange={({ target: { value } }) => changeYear(value)}
              value={date.getFullYear()}
              className="form-control"
              placeholder=""
              aria-label=""
              aria-describedby="basic-addon1"
            />
            <select
              className="form-control"
              value={months[date.getMonth()]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="input-group-append">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  increaseMonth();
                }}
                className="btn btn-outline-secondary"
                disabled={nextMonthButtonDisabled}
              >
                {'>'}
              </button>
            </div>
          </div>
        )}
        className="form-control"
        dateFormat="dd/MM/yyyy"
        minDate={false}
        selected={props.selected}
        onChange={props.onChange}
      />
    </>
  );
};

export default CustomDatePicker;
