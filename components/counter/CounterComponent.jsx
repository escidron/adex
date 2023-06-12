import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function CounterComponent({ counter, setCounter }) {
    return (
        <div className='flex  items-center justify-center w-full h-full border  rounded-lg max-h-[50px] px-2'>
            <RemoveIcon fontSize='small' onClick={counter>1?() => setCounter(counter - 1):null} />
            <input
                onChange={(e)=>setCounter(e.target.value?parseInt(e.target.value):1)}
                type='text'
                value={counter}
                className='w-[25px] text-[14px] text-center focus:outline-none' />
            <AddIcon fontSize='small' onClick={() => setCounter(counter + 1)} />
        </div>
    )
}
