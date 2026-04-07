import React from 'react';
import { LoginForm } from '@/components/auth/login-form';
import { BuildingIcon } from '@/icons/landing-page-icons';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex w-full bg-white">
			{/* Left Content Area: Form */}
			<div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
				<div className="mx-auto w-full max-w-sm lg:w-96 flex flex-col items-center">
					{/* Logo Header */}
					<div className="w-full flex justify-start mb-8 lg:mt-[-50px]">
						<Link to={'/'} className="group">
							<div className="flex items-center cursor-pointer transition-transform duration-300 group-hover:scale-105">
								<div className="bg-primary/10 p-2 rounded-xl">
									<BuildingIcon className="text-primary h-6 w-6" />
								</div>
								<span className="ml-3 text-2xl font-extrabold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
									PDR
								</span>
								<span className="ml-1 text-sm font-semibold uppercase tracking-widest text-gray-500">
									Real Estate
								</span>
							</div>
						</Link>
					</div>

					{/* Glassmorphic Form Card */}
					<div className="w-full bg-white lg:bg-transparent lg:shadow-none shadow-xl rounded-2xl p-8 lg:p-0 border lg:border-none border-gray-100 relative z-10">
						<LoginForm />
					</div>
				</div>
			</div>

			{/* Right Image Area */}
			<div className="hidden lg:block relative w-full flex-1">
				<div className="absolute inset-0 h-full w-full bg-primary/20 z-10" />
				<img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
          alt="Beautiful modern house" />
        
				
				{/* Image Overlay Content */}
				<div className="absolute inset-0 flex items-center justify-center z-20 p-20 bg-gradient-to-t from-gray-900/60 to-transparent">
					<div className="self-end text-white max-w-2xl">
						<h2 className="text-4xl font-bold tracking-tight mb-4">
							Find your dream home with PDR.
						</h2>
						<p className="text-lg text-white/80 font-medium">
							Join thousands of satisfied users who have successfully bought, sold, or rented their perfect property through our unified real estate network.
						</p>
					</div>
				</div>
			</div>
		</div>);

}