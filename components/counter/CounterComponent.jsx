import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function CounterComponent({ counter, setCounter }) {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='rounded-full h-[30px] w-[30px] shadow-md p-2 border cursor-pointer flex justify-center items-center hover:scale-[1.1]'>
                <RemoveIcon fontSize='small' onClick={counter > 1 ? () => setCounter(counter - 1) : null} />
            </div>
            <input
                onChange={(e) => setCounter(e.target.value ? parseInt(e.target.value) : 1)}
                type='text'
                value={counter}
                className='w-[25px] text-[16px] text-center focus:outline-none' />
            <div className='rounded-full h-[30px] w-[30px] shadow-md p-2 border cursor-pointer flex justify-center items-center hover:scale-[1.1]'>
                <AddIcon fontSize='small' onClick={() => setCounter(counter + 1)} />
            </div>
        </div>
    )
}
