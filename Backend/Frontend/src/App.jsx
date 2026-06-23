
import ArtworkList from './components/ArtworkList';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
      </section>
      <div className="App">
      <header>
        <h1>Mi Galería de Arte</h1>
      </header>
      <main>
        <ArtworkList />
      </main>
    </div>
    </>
    
  )
}

export default App
