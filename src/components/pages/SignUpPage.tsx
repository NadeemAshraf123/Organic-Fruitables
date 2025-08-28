import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import main from '../../assets/fruits/main.jpg';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import styles from './SignUpPage.module.css';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'user';
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
    role: yup.string().oneOf(['admin' , 'user']).required('Role is required'),
    
});

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('http://localhost:3000/fruitablesusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert('User registered successfully!');
        reset();
        navigate("/login");
      } else {
        alert('Failed to register user.');
      }
    } catch (err) {
      alert('Error: Could not connect to server.');
    }
  };

  return (
    <div className={styles.signupContainer}>
      
      <div 
        className={styles.backgroundBlur}
        style={{ 
          backgroundImage: `url(${main})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
    
      <div className={styles.contentOverlay}>
        <div className={styles.container}>
          <h2 className={styles.titleheading}>Signup</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
              placeholder="Name"
              {...register('name')}
              className={styles.input}
            />
            <p className={styles.error}>{errors.name?.message}</p>

            <input
              placeholder="Email"
              type="email"
              {...register('email')}
              className={styles.input}
            />
            <p className={styles.error}>{errors.email?.message}</p>

            <input
              placeholder="Password"
              type="password"
              {...register('password')}
              className={styles.input}
            />
            <p className={styles.error}>{errors.password?.message}</p>

            <input
              placeholder="Confirm Password"
              type="password"
              {...register('confirmPassword')}
              className={styles.input}
            />
            <p className={styles.error}>{errors.confirmPassword?.message}</p>

            <select {...register('role')} className={styles.input} style={{borderRadius:"8px 8px 0 0"}} defaultValue="" >
              <option value="" disabled hidden >Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select> 

            <p className={styles.error}>{errors.role?.message}</p>


            <button type="submit" className={styles.outlineWarning}>
              Sign Up
            </button>
          </form>
          <div className={styles.signupFooter}>
            <div className={styles.signupText}>
              <p className={styles.signuptext}> Already have an account? <Link to="/login" className={styles.TologinPageLink}> LogIn </Link> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;