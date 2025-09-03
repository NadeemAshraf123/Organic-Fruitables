import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/Store';
import { increment , decrement, reset } from '../../features/counter/CounterSlice';


const FirstCounter: React.FC = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        

         <div className="p-6 text-center mt-30">
      <h1 className="text-3xl font-bold mb-4">Counter: {count}</h1>
      <div className="space-x-4">
        <button onClick={() => dispatch(increment())} className="px-4 py-2 bg-green-500 text-white rounded">+</button>
        <button onClick={() => dispatch(decrement())} className="px-4 py-2 bg-red-500 text-white rounded">−</button>
        <button onClick={() => dispatch(reset())} className="px-4 py-2 bg-gray-500 text-white rounded">Reset</button>
      </div>
    </div>




    )
}
export default FirstCounter;