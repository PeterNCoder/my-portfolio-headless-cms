import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import WorksCards from './components/WorksCards'
import WorksSingle from './components/WorksSingle'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  const featuredImage = ( featuredImageObject ) => {
    let imgWidth = featuredImageObject.media_details.sizes.full.width;
    let imgHeight = featuredImageObject.media_details.sizes.full.height;
    let imgURL = featuredImageObject.source_url;
    let img = `<img src="${imgURL}" 
        width="${imgWidth}"
        height="${imgHeight}"
        alt="${featuredImageObject.alt_text}"
        srcset="${imgURL} ${imgWidth}w,
        ${featuredImageObject.media_details.sizes.large ? featuredImageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
        ${featuredImageObject.media_details.sizes.medium_large ? featuredImageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
        ${featuredImageObject.media_details.sizes.medium ? featuredImageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
        sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
    return {__html: img}
  }

  return (
    <>
    <Router basename='/'>
      <header>
        <Header/>
      </header>

      <main>
        <Routes>
          <Route 
            path='/' 
            element=
            { <>
              <Home/>
              <About/>
              <WorksCards featuredImage={featuredImage}/>
              <Skills/>
              <Contact/>
            </> } 
          />
        
          <Route 
            path="/:id" 
            element={<WorksSingle/>} 
          />
        </Routes>
      </main>
        
      <footer>
        <Footer/>
      </footer>
    </Router>
    </>
  );
}

export default App;
