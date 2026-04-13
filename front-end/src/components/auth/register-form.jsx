import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function RegisterForm() {
  return (
    <div className="w-full max-w-md space-y-6">
			<div className="text-center">
				<h2 className="mt-2 text-4xl font-black text-primary tracking-tighter leading-none">
					Establish your <span className="italic font-serif text-accent">legacy.</span>
				</h2>
				<p className="mt-4 text-sm text-muted-foreground font-medium uppercase tracking-widest">
					Private Registry: Member Access Only
				</p>
			</div>
			
			<form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                
				<div>
					<label htmlFor="full-name" className="block text-sm justify-start text-gray-700 font-medium mb-1">
						Full Name
					</label>
					<Input
            id="full-name"
            name="full-name"
            type="text"
            required
            className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-primary focus-visible:border-primary focus-visible:z-10 sm:text-sm shadow-sm transition-colors"
            placeholder="Jane Doe" />
          
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label htmlFor="email" className="block text-sm justify-start text-gray-700 font-medium mb-1">
							Email address
						</label>
						<Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-primary focus-visible:border-primary focus-visible:z-10 sm:text-sm shadow-sm transition-colors"
              placeholder="you@example.com" />
            
					</div>
					<div>
						<label htmlFor="phone" className="block text-sm justify-start text-gray-700 font-medium mb-1">
							Phone number
						</label>
						<Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-primary focus-visible:border-primary focus-visible:z-10 sm:text-sm shadow-sm transition-colors"
              placeholder="(555) 000-0000" />
            
					</div>
				</div>

				<div>
					<label htmlFor="role" className="block text-sm justify-start text-gray-700 font-medium mb-1">
						User Role
					</label>
					<div className="relative">
						<select
              id="role"
              name="role"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary sm:text-sm shadow-sm transition-colors cursor-pointer"
              defaultValue="">
              
							<option value="" disabled>Select your role...</option>
							<option value="buyer">Buyer</option>
							<option value="seller">Seller</option>
							<option value="agent">Real Estate Agent</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
							<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
						</div>
					</div>
				</div>
                
				<div>
					<label htmlFor="password" className="block text-sm justify-start text-gray-700 font-medium mb-1">
						Secure Password
					</label>
					<Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-primary focus-visible:border-primary focus-visible:z-10 sm:text-sm shadow-sm transition-colors"
            placeholder="••••••••" />
          
				</div>

				<div className="pt-2">
					<Button
            type="submit"
            className="group relative w-full flex justify-center py-6 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary tracking-wide">
            
						Create Account
					</Button>
				</div>

				<div className="relative mt-4">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-200"></div>
					</div>
					<div className="relative flex justify-center text-xs">
						<span className="px-2 bg-white text-gray-400 uppercase tracking-widest font-semibold rounded-full hidden sm:block">Or Continue With Provider</span>
						<span className="px-2 bg-white text-gray-400 uppercase tracking-widest font-semibold rounded-full sm:hidden">Or</span>
					</div>
				</div>

				<div>
					<Button type="button" variant="outline" className="w-full flex items-center justify-center gap-3 py-6 rounded-lg text-gray-700 font-semibold border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-sm">
						<svg className="h-5 w-5" viewBox="0 0 24 24">
							<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
							<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
							<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
							<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
						</svg>
						Sign up with Google
					</Button>
				</div>
			</form>

			<div className="mt-4 pt-4 border-t border-gray-100 text-center">
				<p className="text-sm text-gray-500 font-medium">
					Already have an account?{' '}
					<Link to="/login" className="text-primary hover:text-primary/70 transition-colors font-bold tracking-wide">
						Log in here
					</Link>
				</p>
			</div>
		</div>);

}