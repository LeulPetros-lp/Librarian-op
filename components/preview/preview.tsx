import { Button } from '@nextui-org/react'
import React from 'react'

const preview = () => {
  return (
    <div className='pt-20'>
        <h1 className='font-bold text-inherit text-5xl  text-center '>
             <span className='font-bold text-inherit text-5xl bg-gradient-to-r from-danger to-primary bg-clip-text text-transparent text-center'>Manage</span> and <span className='font-bold text-inherit text-5xl bg-gradient-to-r from-danger to-primary bg-clip-text text-transparent text-center'>Boost</span> library <br>
             </br><span className='font-bold text-inherit text-5xl bg-gradient-to-r from-danger to-primary bg-clip-text text-transparent text-center mb-20'>Effectivness</span><br></br>
             <Button color='primary' className="mr-10 " style={{ width: 200}}>Get started</Button>
        </h1>
    </div>
  )
}

export default preview