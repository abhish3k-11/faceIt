import React from 'react';
import './Imageinput.css';

const Imageinput =({onInputChange , onButtonSubmit}) => {
	return(
		<div className=''>
			<p className='f3'>
		 		{' The Magic button will detect faces in your picture.Give It a try! '}
			</p>
			<div className='center'>
				<div className=' center form pa4 br3 shadow-5'>
					<input type='text' className=' f4 pa2 w-70 center' onChange={onInputChange} placeholder={'Enter URL of image here...'}/>
					<button className='w-30 f4 grow link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>
					Magic</button>
				</div>	
			</div>
		</div>
		);
}

export default Imageinput;