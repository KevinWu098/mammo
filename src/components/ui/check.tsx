import React, { useState } from 'react'
import { Card } from './card'

interface checkProps {
    title: string;
}
function check({props}:{props: checkProps}) {
    const [checked, setChecked] = useState(false)
    const handleClick = () => {
        setChecked(!checked);
    }
  return (
    <div>
      <Card className="rounded-3xl flex gap-4 p-4 w-full items-center align-center justify-between h-full :hover " style={{border:"4px solid #0094FF"}}>
            <div className="flex gap-4 h-full items-center">
               <input type="checkbox" onClick={handleClick} className='form-checkbox bg-jas-blue h-6 w-6 rounded-xl'/>
                <div className="flex flex-col justify-between h-full gap-2">
                    <h1 className="text-xl font-extrabold">{props.title}</h1>
                    
                    
                </div>
            </div>
           
        </Card>
    </div>
  )
}

export default check
