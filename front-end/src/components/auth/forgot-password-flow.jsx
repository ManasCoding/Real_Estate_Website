import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function ForgotPasswordFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleRequestOTP = (e) => {
    e.preventDefault();
    // Front-end only state change
    setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    // Navigate to step 3
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Successfully reset
    setStep(4);
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {step === 1 && (
        <>
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email and phone number to receive an OTP.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleRequestOTP}>
            <div className="space-y-5 rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="block text-sm justify-start text-gray-700 font-medium mb-1">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-primary focus-visible:border-primary focus-visible:z-10 sm:text-sm shadow-sm"
                  placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm justify-start text-gray-700 font-medium mb-1">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-primary focus-visible:border-primary focus-visible:z-10 sm:text-sm shadow-sm"
                  placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-6 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Send OTP
              </Button>
            </div>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Verify OTP
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent an OTP to your email/phone.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
            <div className="space-y-5 rounded-md shadow-sm">
              <div>
                <label htmlFor="otp" className="block text-sm justify-start text-gray-700 font-medium mb-1">
                  One-Time Password
                </label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 text-center tracking-widest text-lg rounded-lg focus-visible:outline-none focus-visible:ring-primary focus-visible:border-primary focus-visible:z-10 sm:text-sm shadow-sm"
                  placeholder="000000" />
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-6 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Verify
              </Button>
            </div>
            <div className="text-sm text-center">
                <button type="button" onClick={() => setStep(1)} className="font-medium text-primary hover:text-primary/80 transition-colors">
                  Didn't receive it? Go back
                </button>
            </div>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Set New Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter a new secure password.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="space-y-5 rounded-md shadow-sm">
              <div>
                <label htmlFor="new-password" className="block text-sm justify-start text-gray-700 font-medium mb-1">
                  New Password
                </label>
                <Input
                  id="new-password"
                  name="new-password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-primary focus-visible:border-primary focus-visible:z-10 sm:text-sm shadow-sm"
                  placeholder="••••••••" />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm justify-start text-gray-700 font-medium mb-1">
                  Confirm Password
                </label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-primary focus-visible:border-primary focus-visible:z-10 sm:text-sm shadow-sm"
                  placeholder="••••••••" />
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-6 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Reset Password
              </Button>
            </div>
          </form>
        </>
      )}

      {step === 4 && (
        <div className="text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Password Reset
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your password has been successfully reset.
            </p>
            <div className="mt-6">
                <Link to="/login" className="flex justify-center">
                  <Button
                    className="group relative w-full flex justify-center py-6 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Return to Login
                  </Button>
                </Link>
            </div>
        </div>
      )}

      {step !== 4 && (
        <div className="mt-6 text-center text-sm">
            <Link to="/login" className="font-medium text-gray-600 hover:text-gray-900 transition-colors">
              &larr; Back to login
            </Link>
        </div>
      )}
    </div>
  );
}
