import { createContext, useState } from 'react';
import styles from './AuthContext.module.css';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [authModal, setAuthModal] = useState(null);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/');

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email === 'test@beitik.com' && password === '1234') {
        const userData = { 
          email, 
          name: 'Test User',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setAuthModal(null);
        return { success: true, user: userData };
      } else {
        setAuthError('Invalid credentials. Try test@beitik.com / 1234');
        return { success: false, error: 'Invalid credentials' };
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userData = { 
        email, 
        name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthModal(null);
      return { success: true, user: userData };
    } catch (error) {
      setAuthError('Signup failed');
      return { success: false, error: 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    return { success: true };
  };

  const socialLogin = async (provider) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const userData = { 
        email: `user@${provider}.com`, 
        name: `${provider} User`,
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50) + 1}.jpg`
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthModal(null);
      return { success: true, user: userData };
    } catch (error) {
      setAuthError(`${provider} login failed`);
      return { success: false, error: `${provider} login failed` };
    } finally {
      setIsLoading(false);
    }
  };

  const showLogin = (path = '/') => {
    setAuthError('');
    setRedirectPath(path);
    setAuthModal('login');
  };

  const showSignup = (path = '/') => {
    setAuthError('');
    setRedirectPath(path);
    setAuthModal('signup');
  };

  const closeAuthModal = () => setAuthModal(null);

  return (
    <AuthContext.Provider value={{ 
      user, 
      authModal,
      authError,
      isLoading,
      redirectPath,
      login,
      signup,
      logout,
      socialLogin,
      showLogin,
      showSignup,
      closeAuthModal,
      setRedirectPath
    }}>
      {children}
      
      {/* Auth Modal JSX remains the same */}
      {authModal && (
        <div className={styles.authModalOverlay}>
  <div className={styles.authModal}>
            <button 
              className={styles.closeBtn} 
              onClick={closeAuthModal}
              disabled={isLoading}
            >
              &times;
            </button>
            
            <h2 className={styles.modalTitle}>
              {authModal === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            
            {authError && (
              <div className={styles.authError}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg>
                {authError}
              </div>
            )}
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              if (authModal === 'login') {
                login(formData.get('email'), formData.get('password'));
              } else {
                signup(formData.get('email'), formData.get('password'), formData.get('name'));
              }
            }}>
              {authModal === 'signup' && (
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    disabled={isLoading}
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  disabled={isLoading}
                  placeholder="Enter your email"
                  defaultValue={authModal === 'login' ? 'test@beitik.com' : ''}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  required 
                  minLength="4"
                  disabled={isLoading}
                  placeholder="Enter your password"
                  defaultValue={authModal === 'login' ? '1234' : ''}
                />
              </div>
              
              <button 
                type="submit" 
                className={styles.authBtn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className={styles.spinner}></span>
                ) : (
                  authModal === 'login' ? 'Log In' : 'Sign Up'
                )}
              </button>
            </form>
            
            <div className={styles.socialLogin}>
              <div className={styles.divider}>
                <span>OR</span>
              </div>
              
              <div className={styles.socialButtons}>
                <button 
                  type="button"
                  className={`${styles.socialBtn} ${styles.googleBtn}`}
                  onClick={() => socialLogin('google')}
                  disabled={isLoading}
                >
                  Continue with Google
                </button>
                
                <button 
                  type="button"
                  className={`${styles.socialBtn} ${styles.facebookBtn}`}
                  onClick={() => socialLogin('facebook')}
                  disabled={isLoading}
                >
                  Continue with Facebook
                </button>
              </div>
            </div>
            
            <div className={styles.authSwitch}>
              {authModal === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={showSignup}
                    disabled={isLoading}
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    onClick={showLogin}
                    disabled={isLoading}
                  >
                    Log in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};