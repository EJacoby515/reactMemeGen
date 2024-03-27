import {  useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import { server_calls } from '../api/server';

function MemeTable () {
    let [open, setOpen ] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose  = () => {
        setOpen(false)
    }

    const  getData = async () => {
        const result = await server_calls.get();
        console.log(result)
    }

    return(
    <>
        <Modal
            open={open}
            onClose={handleClose}
            />
            <div className='flex flex-row'>
                <div>
                    <button 
                    className='p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white'
                    onClick={() => handleOpen()}
                    >
                        Create your own Meme
                    </button>
                </div>
                <Button className='p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white'>
                    Update
                </Button>
                <Button className='p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white'>
                    Delete
                </Button>
                <button onClick={getData}>get Data</button>
            </div>
            

        </>
    )
}

export default MemeTable