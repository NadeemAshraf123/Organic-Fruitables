import React, { useState } from 'react';
import { Link , useNavigate, useLocation } from 'react-router-dom';
import main from '../../assets/fruits/main.jpg';
import './LoginPage.css';
import { useForm } from 'react-hook-form';

interface LoginProps {}

const LoginPage: React.FC<LoginProps> = ({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null >(null);
  const [isLoading, setIsLoading] = useState(false);



  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const emailResponse = await fetch(`http://localhost:3000/fruitablesusers?email=${email}`);

      if (!emailResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const matchedUsers = await emailResponse.json();

      if (matchedUsers.length === 0) {
          setMessage("Email not found. Please sign up first.");
        setMessageType('error');
      setTimeout(() => {
        navigate("/signuppage", { state: {from: location.state?.from  }});
      }, 1500);
    return;
   }

   const user = matchedUsers[0];
   if (user.password !== password) {
    setMessage("Invalid password.");
    setMessageType("error");  
    return;
   }

   if (!user.role) {
    setMessage("user role not defined. PLease contact support. ");
    setMessageType("error");
    return;
   }

   setMessage("Login successful!");
   setMessageType("success");

   localStorage.setItem("loggedInUser", JSON.stringify(user));
   localStorage.setItem("isAuthenticated", "true");
   setIsAuthenticated(true);

    setTimeout(() => {
      if(user.role === 'admin') {
        navigate('/dashboard', { replace: true});
      } else {
        navigate('/' , { replace: true });
      }
        // navigate(from, { replace: true });
    }, 1000);

    } catch (error) {
        console.log(error)
      setMessage("Login failed. Please try again.");
      setMessageType('error');
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

   return (
    <div className="login-container">
      <div 
        className="background-blur"
        style={{ 
          backgroundImage: `url(${main})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      <div className="content-overlay">
        <div className="login-card">
          <h2 className="login-title">Login</h2>

          {message && (
            <p className={`message ${messageType === 'error' ? 'error' : "success"}`}>
              {message}
            </p>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading} // Disable during loading
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading} // Disable during loading
              />
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading} // Disable during loading
            >
              {isLoading ? 'Logging in...' : 'Login'} {/* Show loading text */}
            </button>
          </form>

          <div className="login-footer">
            <p className="signup-text">
              Don't have an account?{' '}
              <Link 
                to="/signuppage" 
                className="signup-link"
                state={{ from: location.state?.from }} // Pass along redirect info
              >
                Sign up
              </Link>
            </p>
            <p>
              <Link to='/' className="home-button-navigation">Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;