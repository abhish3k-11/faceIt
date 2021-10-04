import React from 'react';
import Logo from '../Logo/Logo.js'

const Navigation =({onRouteChange,isSignedIn}) => {
	if (isSignedIn)
	{
			return(
				<nav style={ {display:'flex',justifyContent:'flex-end'}}>
			        <Logo style={ {float:'left' }}/>
						<p className='f3'style={ {width:'100%'}} onClick={ () => onRouteChange('signout')}>
							<span className='link pointer black underline pa3 dim' style={{ float:'right'}}>Sign Out
							</span>
						</p>		
				</nav>
				);
	}
	else { 
		return(
				<nav style={ {display:'flex',justifyContent:'flex-end'}}>
			        <Logo style={ {float:'left' }}/>
						<p className='f3'style={ {width:'100%'}} onClick={ () => onRouteChange('signin')}>
								<span className='link pointer black underline pa3 dim' style={{ float:'right' }}>Sign In
								</span>
						</p>
						<p className='f3'style={ {width:'auto'}} onClick={ () => onRouteChange('register')}>
							<span className='link pointer black underline pa3 dim' style={{ float:'right'}}>Register
							</span>
						</p>			
				</nav>
				);

	}
}

export default Navigation;