import './App.css';
import Home from './components/Home'
import About from './components/About'

function App() {

  return (
    <>
        <header>
          <nav>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main>
      <Home/>
      <About/>
        </main>
        <footer>
				  <p>&copy; Peter Nguyen 2023</p>
        </footer>
    </>
  );
}

export default App;
