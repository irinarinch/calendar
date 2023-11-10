export const Calendar = (props) => {
  const { date } = props;
  
  const today = date.format('LL');
  const todayDayNumber = Number(date.format('DD'));
  const todayDayOfWeek = date.format('dddd');
  const daysInMonth = date.daysInMonth();
  const materialMonth = today.replace(/\d/g, '').slice(1, -2);
  const year = date.format('YYYY');
  const month = date.format('MMMM');

  const dateClone = date.clone(); 
  const dayOfWeekOfFirstDay = (Number(dateClone.startOf('month').format('d')) + 6) % 7;
  const daysInPreviouseMonth = dateClone.subtract('month', 1).daysInMonth();
  
  function getMonth() {
    const rows = Math.ceil((dayOfWeekOfFirstDay + daysInMonth) / 7);   
    const columns = 7;
  
    let table = [];
    let tr = [];
    let dayNumber = 1 - dayOfWeekOfFirstDay;
    
    for (let i = 0; i < rows; i += 1) {
      tr = [];
      for (let j = 0; j < columns; j += 1) { 
        if (dayNumber <= 0) {
          tr.push(<td className="ui-datepicker-other-month">{dayNumber + daysInPreviouseMonth}</td>); 
        } else if (dayNumber > 0 && dayNumber <= daysInMonth && dayNumber !== todayDayNumber) {
          tr.push(<td>{dayNumber}</td>);                 
        } else if (dayNumber > daysInMonth) {         
          tr.push(<td className="ui-datepicker-other-month">{dayNumber - daysInMonth}</td>);          
        } else if (dayNumber === todayDayNumber) {
          tr.push(<td className="ui-datepicker-today">{dayNumber}</td>);          
        }

        dayNumber += 1;         
      }
      table.push(<tr>{tr}</tr>)
    }
    
    return table;
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{todayDayOfWeek}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{todayDayNumber}</div>
          <div className="ui-datepicker-material-month">{materialMonth}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col className="ui-datepicker-week-end"></col>
          <col className="ui-datepicker-week-end"></col>
        </colgroup>        
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody className="tbody">{getMonth()}</tbody>
      </table>
    </div>
  );
};