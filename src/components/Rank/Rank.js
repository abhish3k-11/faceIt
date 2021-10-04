import React from 'react';
 const Rank =({name , entries})=>{
 	return(
 	 <div className=''>
	 	 <div className='f3 white'>
	 	 	{`${name} Your current entry count is`}
	 	 </div>
	 	 <div className='f2 white'>
	 	 	{entries}
	 	 </div>
	</div>
 		);
 }

 export default Rank;