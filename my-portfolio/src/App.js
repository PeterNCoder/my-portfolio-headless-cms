import './App.css';
import Home from './components/Home'

function App() {

  return (
    <>
        <header id="masthead" className="site-header">
          <div className="site-branding">
            <h1>Peter Nguyen</h1>
          </div>
          <nav className="site-navigation">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main id="main">
      <Home/>
        </main>
        <footer>
				  <p>&copy; Peter Nguyen 2023</p>
        </footer>
    </>
  );
}

export default App;
