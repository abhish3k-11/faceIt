import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './Logo.png';
const Logo =() => {
	return(
		<div className= 'ma3 mt0 logo' style={{marginTop:'10px'}}>
			<Tilt className="Tilt br2 shadow-2" options={{ max :55 }} style={{ height: 100, width: 100 }} >
 				<div className='Tilt-inner'>
 					<a href="https://github.com/abhish3k-11" target="_blank" rel="noopener noreferrer">
 		 				<img src={logo} alt='logo'/>
 					</a>
 				</div>
			</Tilt>
		</div>
		);
}

export default Logo;