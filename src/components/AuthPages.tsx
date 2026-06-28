import React, { useState } from 'react';
import { 
  Flame, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles
} from 'lucide-react';
import { hashPassword, verifyPassword } from '../utils/crypto';
import { UserAccount } from '../types';

interface AuthPagesProps {
  view: 'login' | 'signup' | 'forgot-password';
  onViewChange: (newView: 'login' | 'signup' | 'forgot-password') => void;
  users: UserAccount[];
  onAddUser: (newUser: UserAccount) => void;
  onLoginSuccess: (email: string, name: string, tier: 'Free' | 'Premium', points: number) => void;
  onUpdateUserPassword: (email: string, newPasswordHash: string) => void;
  onBackToHome: () => void;
}

export default function AuthPages({
  view,
  onViewChange,
  users,
  onAddUser,
  onLoginSuccess,
  onUpdateUserPassword,
  onBackToHome
}: AuthPagesProps) {
  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Reset Password states
  const [resetCode, setResetCode] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Error / Loading states
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Form Validations
  const validateEmail = (emailStr: string) => {
    return /\S+@\S+\.\S+/.test(emailStr);
  };

  // Failed Attempts Tracker (Brute Force protection)
  const checkFailedAttempts = (emailStr: string): boolean => {
    const attemptsKey = `tadka_failed_attempts_${emailStr.toLowerCase()}`;
    const lockoutKey = `tadka_lockout_until_${emailStr.toLowerCase()}`;
    
    const now = Date.now();
    const lockoutUntil = Number(localStorage.getItem(lockoutKey) || '0');
    
    if (lockoutUntil > now) {
      const remainingSecs = Math.ceil((lockoutUntil - now) / 1000);
      setErrorMsg(`Too many failed login attempts. Please try again in ${remainingSecs} seconds.`);
      return false;
    }
    return true;
  };

  const registerFailedAttempt = (emailStr: string) => {
    const attemptsKey = `tadka_failed_attempts_${emailStr.toLowerCase()}`;
    const lockoutKey = `tadka_lockout_until_${emailStr.toLowerCase()}`;
    
    const currentAttempts = Number(localStorage.getItem(attemptsKey) || '0') + 1;
    localStorage.setItem(attemptsKey, String(currentAttempts));
    
    if (currentAttempts >= 5) {
      const lockoutUntil = Date.now() + 60 * 1000; // 60 seconds lockout
      localStorage.setItem(lockoutKey, String(lockoutUntil));
      localStorage.setItem(attemptsKey, '0'); // reset count
      setErrorMsg('Too many failed login attempts. This account is locked for 60 seconds.');
    } else {
      setErrorMsg('Invalid email or password.');
    }
  };

  const clearFailedAttempts = (emailStr: string) => {
    const attemptsKey = `tadka_failed_attempts_${emailStr.toLowerCase()}`;
    const lockoutKey = `tadka_lockout_until_${emailStr.toLowerCase()}`;
    localStorage.removeItem(attemptsKey);
    localStorage.removeItem(lockoutKey);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both your Email ID and Password.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!checkFailedAttempts(cleanEmail)) {
      return;
    }

    setLoading(true);

    // Simulate database delay
    setTimeout(async () => {
      try {
        const foundUser = users.find(u => u.email.toLowerCase() === cleanEmail);
        
        if (!foundUser) {
          setErrorMsg('Account not found. Please create an account.');
          setLoading(false);
          return;
        }

        const isMatch = await verifyPassword(password, foundUser.passwordHash);
        if (!isMatch) {
          registerFailedAttempt(cleanEmail);
          setLoading(false);
          return;
        }

        // Success!
        clearFailedAttempts(cleanEmail);

        // Remember Me cookie/storage logic
        if (rememberMe) {
          localStorage.setItem('tadka_remember_me', 'true');
        } else {
          localStorage.removeItem('tadka_remember_me');
        }

        setSuccessMsg(`Welcome back, ${foundUser.name}!`);
        setTimeout(() => {
          onLoginSuccess(foundUser.email, foundUser.name, foundUser.tier, foundUser.points);
          setLoading(false);
        }, 1200);

      } catch (err) {
        setErrorMsg('An error occurred during verification.');
        setLoading(false);
      }
    }, 1000);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your Full Name.');
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      setErrorMsg('Please enter a valid Email ID.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Confirm Password does not match Password.');
      return;
    }

    // Check unique email
    const emailExists = users.some(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (emailExists) {
      setErrorMsg('An account with this Email ID already exists.');
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        const passwordHash = await hashPassword(password);
        const newUser: UserAccount = {
          id: `user-${Date.now()}`,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          passwordHash,
          role: 'User',
          tier: 'Free',
          points: 100, // Welcome points
          registeredAt: new Date().toISOString()
        };

        onAddUser(newUser);
        setSuccessMsg('Account created successfully.');
        
        setTimeout(() => {
          onLoginSuccess(newUser.email, newUser.name, newUser.tier, newUser.points);
          setLoading(false);
        }, 1500);

      } catch (err) {
        setErrorMsg('An error occurred during account registration.');
        setLoading(false);
      }
    }, 1200);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !validateEmail(email)) {
      setErrorMsg('Please enter a valid Email ID.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const foundUser = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      
      // Let's send the link anyway to be secure or notify them
      setResetSent(true);
      setSuccessMsg('Password reset link has been sent to your email.');
      setLoading(false);
    }, 1200);
  };

  const handleResetPasswordConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (resetCode !== '123456') {
      setErrorMsg('Invalid verification code. Use simulated code 123456.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('New password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        const foundUser = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
        if (!foundUser) {
          setErrorMsg('Error: Account not found.');
          setLoading(false);
          return;
        }

        const hashed = await hashPassword(password);
        onUpdateUserPassword(foundUser.email, hashed);
        setResetSuccess(true);
        setSuccessMsg('Your password has been reset successfully!');
        setLoading(false);
        
        setTimeout(() => {
          onViewChange('login');
          // reset state
          setResetSent(false);
          setResetSuccess(false);
          setResetCode('');
          setPassword('');
          setConfirmPassword('');
        }, 1800);

      } catch (err) {
        setErrorMsg('Error resetting password.');
        setLoading(false);
      }
    }, 1000);
  };

  // Initialize and render Google Identity Services button
  React.useEffect(() => {
    let intervalId: any;
    
    const initGIS = () => {
      if (typeof window !== 'undefined' && (window as any).google) {
        clearInterval(intervalId);
        const google = (window as any).google;
        try {
          google.accounts.id.initialize({
            client_id: (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '964858546555-5v88lkrg42a5skncl019vep1p7s2eunp.apps.googleusercontent.com',
            callback: (response: any) => {
              if (response.credential) {
                try {
                  // Decode JWT safely supporting UTF-8 names
                  const base64Url = response.credential.split('.')[1];
                  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                  }).join(''));
                  
                  const payload = JSON.parse(jsonPayload);
                  const googleEmail = payload.email;
                  const googleName = payload.name;
                  
                  if (googleEmail) {
                    setLoading(true);
                    setErrorMsg('');
                    setSuccessMsg(`Google Authentication successful! Welcome, ${googleName || googleEmail}.`);

                    const existing = users.find(u => u.email.toLowerCase() === googleEmail.toLowerCase());
                    
                    setTimeout(() => {
                      if (existing) {
                        onLoginSuccess(existing.email, existing.name, existing.tier, existing.points);
                      } else {
                        // Auto register the Google account
                        const newUser: UserAccount = {
                          id: `google-${payload.sub || Date.now()}`,
                          name: googleName || googleEmail.split('@')[0],
                          email: googleEmail.toLowerCase(),
                          passwordHash: 'GOOGLE_AUTHENTICATED_NOPASS',
                          role: 'User',
                          tier: 'Free',
                          points: 150, // Google Sign-In bonus!
                          registeredAt: new Date().toISOString()
                        };
                        onAddUser(newUser);
                        onLoginSuccess(newUser.email, newUser.name, newUser.tier, newUser.points);
                      }
                      setLoading(false);
                    }, 1200);
                  }
                } catch (e) {
                  console.error("Failed to decode JWT:", e);
                  setErrorMsg('Failed to process Google account credentials.');
                }
              }
            },
            auto_select: false,
            cancel_on_tap_outside: true
          });

          const btnContainer = document.getElementById('google-signin-btn-container');
          if (btnContainer) {
            google.accounts.id.renderButton(btnContainer, {
              theme: 'outline',
              size: 'large',
              width: '320', // Explicit width to fit perfectly in login cards
              text: 'continue_with',
              shape: 'rectangular',
              logo_alignment: 'left'
            });
          }
        } catch (err) {
          console.error("GIS initialization error:", err);
        }
      }
    };

    initGIS();
    intervalId = setInterval(initGIS, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [users, onLoginSuccess, onAddUser, view]);

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 lg:py-16" id="auth-portal-page">
      <div className="border border-neutral-100 bg-white p-8 sm:p-10 rounded-3xl shadow-xl dark:border-neutral-800 dark:bg-neutral-950 transition-colors duration-300">
        
        {/* Back Button */}
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-orange-600 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Homepage</span>
        </button>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-md shadow-orange-500/10 mb-4">
            <Flame className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
            {view === 'login' && 'Welcome to Tadka Club'}
            {view === 'signup' && 'Create Your Tadka Account'}
            {view === 'forgot-password' && 'Reset Password'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
            {view === 'login' && 'Unlock gourmet recipes, daily reward points, and live finance calculators.'}
            {view === 'signup' && 'Register now to earn +100 welcome reward points immediately.'}
            {view === 'forgot-password' && 'Enter your verified email address to recover your account.'}
          </p>
        </div>

        {/* Global Success / Error Feedback Banner */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-600 dark:bg-red-950/20 dark:text-red-400 mb-6 border border-red-100 dark:border-red-900/30">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
            <div>{errorMsg}</div>
          </div>
        )}

        {successMsg && (
          <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 mb-6 border border-emerald-100 dark:border-emerald-900/30">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            <div>{successMsg}</div>
          </div>
        )}

        {/* Core Auth Forms */}

        {view === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Email ID</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
                <input
                  type="email"
                  required
                  placeholder="chef@tadkaclub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-11 pr-4 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Password</label>
                <button 
                  type="button"
                  onClick={() => onViewChange('forgot-password')}
                  className="text-[10px] font-bold text-orange-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-11 pr-11 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded-md border-neutral-200 text-orange-600 focus:ring-orange-500 dark:border-neutral-800 dark:bg-neutral-900"
                />
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Remember Me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 py-3 text-xs font-extrabold text-white transition flex items-center justify-center gap-2 shadow-md shadow-orange-500/10 cursor-pointer mt-2"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Sign In to Tadka Club</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Google Authentication */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-100 dark:border-neutral-900"></div>
              </div>
              <span className="relative bg-white px-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest dark:bg-neutral-950">Or sign in with</span>
            </div>

            <div 
              id="google-signin-btn-container" 
              className="w-full flex justify-center py-1 overflow-hidden"
            ></div>

            <div className="text-center mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-900 text-xs text-neutral-400">
              New to the club?{' '}
              <button
                type="button"
                onClick={() => onViewChange('signup')}
                className="font-extrabold text-orange-600 hover:underline"
              >
                Create an account
              </button>
            </div>
          </form>
        )}

        {view === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="Ravi Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-11 pr-4 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Email ID</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
                <input
                  type="email"
                  required
                  placeholder="chef@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-11 pr-4 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-11 pr-11 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Dynamic validation feedback */}
              <div className="mt-1 flex items-center gap-1.5 text-[10px] text-neutral-400">
                <div className={`h-1.5 w-1.5 rounded-full ${password.length >= 8 ? 'bg-emerald-500' : 'bg-neutral-300'}`}></div>
                <span>Minimum 8 characters</span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
                <input
                  type="password"
                  required
                  placeholder="Re-type password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-11 pr-4 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>
              {password && confirmPassword && (
                <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                  {password === confirmPassword ? (
                    <span className="text-emerald-500 font-bold">✓ Passwords match</span>
                  ) : (
                    <span className="text-red-500 font-bold">✗ Passwords do not match</span>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 py-3 text-xs font-extrabold text-white transition flex items-center justify-center gap-2 shadow-md shadow-orange-500/10 cursor-pointer mt-4"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="text-center mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-900 text-xs text-neutral-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onViewChange('login')}
                className="font-extrabold text-orange-600 hover:underline"
              >
                Sign In instead
              </button>
            </div>
          </form>
        )}

        {view === 'forgot-password' && (
          <div>
            {!resetSent ? (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Email ID</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
                    <input
                      type="email"
                      required
                      placeholder="chef@tadkaclub.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-11 pr-4 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 py-3 text-xs font-extrabold text-white transition flex items-center justify-center gap-2 shadow-md shadow-orange-500/10 cursor-pointer mt-2"
                >
                  {loading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <span>Send Password Reset Link</span>
                  )}
                </button>

                <div className="text-center mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-900 text-xs text-neutral-400">
                  <button
                    type="button"
                    onClick={() => onViewChange('login')}
                    className="font-extrabold text-neutral-500 hover:text-orange-600 transition flex items-center justify-center gap-1 mx-auto"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Return to Login</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {resetSuccess ? (
                  <div className="text-center py-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white">Password Reset Complete</h4>
                    <p className="text-xs text-neutral-400 mt-1">Redirecting you to the login screen...</p>
                  </div>
                ) : (
                  <form onSubmit={handleResetPasswordConfirm} className="space-y-4">
                    <div className="p-4 rounded-xl bg-orange-50 text-orange-800 text-xs dark:bg-orange-950/20 dark:text-orange-300 border border-orange-100 dark:border-orange-900/30">
                      <p className="font-bold flex items-center gap-1.5 mb-1">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span>Simulated Reset Email Sent!</span>
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        To test this securely in the sandbox browser environment, enter code <strong>123456</strong> and write your new password below.
                      </p>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Verification Code</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., 123456"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">New Password</label>
                      <input
                        type="password"
                        required
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Confirm Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Re-type password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 py-3 text-xs font-extrabold text-white transition flex items-center justify-center gap-2 shadow-md shadow-orange-500/10 cursor-pointer mt-2"
                    >
                      {loading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <span>Save New Password</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
