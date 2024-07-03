import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    return (
        <header>
            <figure className='imgMuseu'>
                <img src="/museuImg.png" alt="" />
                </figure>
            <nav className='navbar navbar-expand-lg navbar-light '>
                <div className='container-fluid'>
                    
                    <button className='navbar-toggler custom-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                    
                    </button>

                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <ul className='navbar-nav custom-navbar-nav'>
                            <li className='nav-item'><Link className='nav-link' to="/">Home</Link></li>
                            <li className='nav-item'><Link className='nav-link' to="/about">Sobre</Link></li>
                            <li className='nav-item'><Link className='nav-link' to="/contact">Contato</Link></li>
                        </ul>
                    </div>

                </div>
            </nav>
            <button className='btn-primary' type='button'><Link className='nav-link'to="/document">Documentação</Link> </button>
        </header>
    )
}

export default Header;
