import React, {useState, useEffect} from 'react';
import './Navigation.css';
import {Link} from 'react-router-dom';


function Navigation() {
    const [button, setButton] = useState(true);
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
        <nav className = 'navibar'>
            <div className ='navibar-container'>
                
                <div className='menu-icon' onClick={handleClick}> 

                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'navi-menu active' : 'navi-menu'}>
                    <li className = 'navi-item'>
                        <Link to='/task' className='navi-links' onClick={closeMobileMenu}>
                        Task
                        </Link>
                        </li>
                    <li className = 'navi-item'>
                        <Link to='/task/new' className='navi-links' onClick={closeMobileMenu}>
                        Add new Task
                        </Link>
                    </li>    
                </ul>

            </div>
            
            </nav>
            <br></br>
        </>
    );
}

export default Navigation
