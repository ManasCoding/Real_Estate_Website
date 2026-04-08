import React from 'react';
import { ForgotPasswordFlow } from '@/components/auth/forgot-password-flow';
import { BuildingIcon } from '@/icons/landing-page-icons';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-2 bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-100">
				{/* Logo Header */}
				<div className="w-full flex justify-center mb-2">
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

				<ForgotPasswordFlow />
			</div>
		</div>
  );
}
