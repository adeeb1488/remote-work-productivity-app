import logo from './logo.svg';
import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen.jsx';
import Navbar from './components/HomeScreen/Navbar.jsx';
import GlobalStyle from './globalStyles.js';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Navbar />
    <HomeScreen />
    </div>
  );
}

export default App;
