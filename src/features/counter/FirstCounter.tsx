import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/Store';
// import { incrementByAmount } from './CounterSlice';
import { increment, decrement, incrementByAmount,equal } from './CounterSlice'


const FirstCounter = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return ( 
        <div className='p-4 text-center mt-100'>
            <h2 className='text-xl font-bold mb-2'> Counter: {count}</h2>
            <button onClick={() => dispatch(decrement())} className='px-4 py-2 bg-yellow-500 text-white mr-2'> - </button>
            <button onClick={() => dispatch(increment())} className='px-4 py-2 bg-green-500 text-white mr-2'> + </button>
            <button onClick={() => dispatch(equal())} className='px-4 py-2 bg-red-500 text-white mr-2'> =0= </button>

            <button onClick={() => dispatch(incrementByAmount(5))} className='px-4 py-2 bg-blue-500 text-white mr-2'> +5 </button>


        </div>
    )
}

export default FirstCounter;