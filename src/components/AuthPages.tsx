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
import { hashPassword } from '../utils/crypto';
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

  // Interactive Google Login State
  const [showGoogleSim, setShowGoogleSim] = useState(false);

  // Form Validations
  const validateEmail = (emailStr: string) => {
    return /\S+@\S+\.\S+/.test(emailStr);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both your Email ID and Password.');
      return;
    }

    setLoading(true);

    // Simulate database delay
    setTimeout(async () => {
      try {
        const foundUser = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
        
        if (!foundUser) {
          setErrorMsg('This email ID is not registered with Tadka Club.');
          setLoading(false);
          return;
        }

        const hashed = await hashPassword(password);
        if (foundUser.passwordHash !== hashed) {
          setErrorMsg('Incorrect Password. Please check your credentials and try again.');
          setLoading(false);
          return;
        }

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

  const handleGoogleSimulate = () => {
    setShowGoogleSim(true);
  };

  const selectGoogleAccountSim = (simName: string, simEmail: string) => {
    setShowGoogleSim(false);
    setLoading(true);
    
    setTimeout(() => {
      const existing = users.find(u => u.email.toLowerCase() === simEmail.toLowerCase());
      if (existing) {
        onLoginSuccess(existing.email, existing.name, existing.tier, existing.points);
      } else {
        // Auto register
        const newUser: UserAccount = {
          id: `user-${Date.now()}`,
          name: simName,
          email: simEmail,
          passwordHash: 'GOOGLE_AUTHENTICATED_NOPASS',
          role: 'User',
          tier: 'Free',
          points: 150, // Google Sign In Bonus!
          registeredAt: new Date().toISOString()
        };
        onAddUser(newUser);
        onLoginSuccess(newUser.email, newUser.name, newUser.tier, newUser.points);
      }
      setLoading(false);
    }, 1200);
  };

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

            {/* Google Authentication (Optional Simulator) */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-100 dark:border-neutral-900"></div>
              </div>
              <span className="relative bg-white px-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest dark:bg-neutral-950">Or sign in with</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSimulate}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-850 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900/40 transition shadow-xs"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.47 15 0 12 0 7.35 0 3.39 2.67 1.47 6.56l3.84 2.98C6.24 6.7 8.93 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.47-1.11 2.71-2.36 3.56l3.66 2.84c2.14-1.98 3.39-4.89 3.39-8.51z" />
                <path fill="#FBBC05" d="M5.31 14.54c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.47 6.56C.53 8.46 0 10.58 0 12s.53 3.54 1.47 5.44l3.84-2.9z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.66-2.84c-1.01.68-2.31 1.09-4.3 1.09-3.07 0-5.76-1.66-6.69-4.5H1.47v2.98C3.39 21.33 7.35 24 12 24z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Simulated Google Accounts Dialog */}
            {showGoogleSim && (
              <div className="p-4 mt-4 rounded-2xl bg-neutral-50 border dark:bg-neutral-900/50 dark:border-neutral-800 text-left relative animate-fade-in">
                <h4 className="text-[11px] font-black text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  <span>Choose Google Account</span>
                </h4>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => selectGoogleAccountSim('Ravi Kumar', 'ravikumar870317@gmail.com')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl bg-white hover:bg-neutral-100 text-left border border-neutral-100 dark:bg-neutral-950 dark:hover:bg-neutral-900 dark:border-neutral-800 transition"
                  >
                    <div className="h-8 w-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">R</div>
                    <div>
                      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Ravi Kumar</p>
                      <p className="text-[10px] text-neutral-400">ravikumar870317@gmail.com</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => selectGoogleAccountSim('Amit Patel', 'amit@tadkaclub.com')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl bg-white hover:bg-neutral-100 text-left border border-neutral-100 dark:bg-neutral-950 dark:hover:bg-neutral-900 dark:border-neutral-800 transition"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">A</div>
                    <div>
                      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Amit Patel</p>
                      <p className="text-[10px] text-neutral-400">amit@tadkaclub.com</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => selectGoogleAccountSim('Guest Chef', 'guest.chef@gmail.com')}
                    className="w-full flex items-center gap-3 p-2 rounded-xl bg-white hover:bg-neutral-100 text-left border border-neutral-100 dark:bg-neutral-950 dark:hover:bg-neutral-900 dark:border-neutral-800 transition"
                  >
                    <div className="h-8 w-8 rounded-full bg-neutral-600 text-white flex items-center justify-center font-bold text-xs">G</div>
                    <div>
                      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">New Guest Chef</p>
                      <p className="text-[10px] text-neutral-400">guest.chef@gmail.com</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

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
