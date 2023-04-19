import './css/all.css';
import NavBar  from './js/Header/header';
import Tabela from './js/Main/Mains';
import Sidebar from './js/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Sidebar/>
      <Tabela/>
    </div>
  );
}

export default App;
