import HubLayout from './components/layout/HubLayout';
import ArtworkList from './components/ArtworkList';
import './App.css';

function App() {
  return (
    <HubLayout>
      <h1>Explora Arte</h1>
      {/* Aquí irá tu buscador en el futuro */}
      <ArtworkList />
    </HubLayout>
  );
}

export default App;
