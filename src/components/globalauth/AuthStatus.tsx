import { useSelector, useDispatch } from 'react-redux';
import type { RootState , AppDispatch } from '../../app/Store';
import { login, logout } from '../../features/auth/AuthSlice';


const AuthStatus = () => {

    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <div>
            {isAuthenticated ? (
                <button onClick={() => dispatch(logout())}> Logout </button>
            ) : (
                <button onClick={() => dispatch(login())}> Login  </button>
            )}
        </div>
    )
}

export default AuthStatus;
