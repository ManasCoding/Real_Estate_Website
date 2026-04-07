import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function LoginForm() {
  return (
    <div className="w-full max-w-md space-y-8">
			<div className="text-center">
				<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
					Welcome back
				</h2>
				<p className="mt-2 text-sm text-gray-600">
					Please enter your details to sign in
				</p>
			</div>
			
			<form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
				<div className="space-y-5 rounded-md shadow-sm">
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
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-primary focus-visible:border-primary focus-visible:z-10 sm:text-sm shadow-sm"
              placeholder="you@example.com" />
            
					</div>
					<div>
						<label htmlFor="password" className="block text-sm justify-start text-gray-700 font-medium mb-1">
							Password
						</label>
						<Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-primary focus-visible:border-primary focus-visible:z-10 sm:text-sm shadow-sm"
              placeholder="••••••••" />
            
					</div>
				</div>

				<div className="flex items-center justify-between mt-4">
					<div className="flex items-center">
						<input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" />
            
						<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
							Remember me
						</label>
					</div>

					<div className="text-sm">
						<a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">
							Forgot your password?
						</a>
					</div>
				</div>

				<div>
					<Button
            type="submit"
            className="group relative w-full flex justify-center py-6 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            
						Sign in
					</Button>
				</div>
			</form>

			<div className="mt-6 text-center">
				<p className="text-sm text-gray-600">
					Don't have an account?{' '}
					<Link to="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
						Sign up for free
					</Link>
				</p>
			</div>
		</div>);

}