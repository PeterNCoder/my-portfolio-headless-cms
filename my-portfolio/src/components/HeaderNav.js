import logo from '../logo.png'

const HeaderNav = () => {

    return (
        <>
        <img src={logo} className="header-logo" alt="logo" />
          <nav>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </>   
    )
  
}

export default HeaderNav
