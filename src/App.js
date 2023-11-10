import './App.css';

import { Calendar } from './components/Calendar';
import moment from 'moment';
import 'moment/locale/ru';

const now = moment();

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;
