import { useSelector } from 'react-redux';
import type { RootState } from '../../app/Store';


const Cart = () => {
    
    const items = useSelector((state: RootState) => state.cart.items);

    return (
        <div>
            <h2>Your Cart</h2>
            {items.map(item => (
                <div key={item.id}>
                    <img src={item.image} alt={item.name} className='w-16 h-16' />
                    <span>{ item.name} </span>
                    <span> {item.quantity} * ${item.price} </span>

                </div>
            ))}
        </div>
    )
}

export default Cart;

