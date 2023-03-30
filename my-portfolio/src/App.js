import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import WorksCards from './components/WorksCards'
import Work from './components/Work'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
    <Router basename='/'>
      <header id="site-header">
        <Header/>
      </header>

      <main id="site-main">
        <Routes>
          <Route 
            path='/' 
            element=
            { <>
              <Home/>
              <About/>
              <WorksCards/>
              <Skills/>
              <Contact/>
            </> } 
          />
        
          <Route 
            path="/:id" 
            element={<Work/>} 
          />
        </Routes>
      </main>
        
      <footer id="site-footer">
        <Footer/>
      </footer>
    </Router>
    </>
  );
}

export default App;
