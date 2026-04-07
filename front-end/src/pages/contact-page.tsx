import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BuildingIcon } from '@/icons/landing-page-icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* Inline Lucide-style generic SVGs for premium Contact UI detailing */
const MapPinIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const ClockIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

// Framer Motion Animation Settings
const fadeInDown = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
};

export default function ContactPage() {
	return (
		<div className="h-screen relative flex flex-col justify-center py-2 sm:px-6 lg:px-8 overflow-hidden bg-zinc-200">
			
            {/* Thematic Abstract Background Decorators */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/20 blur-[100px]"></div>
                <div className="absolute -bottom-40 -left-60 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px]"></div>
            </div>

			{/* Branding Header Area */}
			<motion.div 
                className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center mb-4"
                initial="hidden"
                animate="visible"
                variants={fadeInDown}
            >
				<Link to={'/'} className="group">
					<div className="flex items-center cursor-pointer transition-transform duration-300 group-hover:scale-105 mb-4">
						<div className="bg-primary/10 p-2 md:p-3 rounded-2xl border border-primary/10">
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
				<h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
					Let's build your future.
				</h2>
			</motion.div>

			<motion.div 
                className="relative z-10 mt-2 w-full px-4 sm:mx-auto sm:max-w-6xl"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
				<div className="bg-white/70 backdrop-blur-3xl shadow-2xl shadow-primary/10 sm:rounded-[2rem] border border-white flex flex-col lg:flex-row overflow-hidden h-[80vh] w-full">
					
					{/* Left: Contact Info Column */}
					<div className="hidden md:flex lg:w-[40%] bg-gradient-to-br from-primary to-[#4a269c] p-8 lg:p-12 text-white flex-col justify-between relative overflow-hidden">
                        {/* Inner subtle glow for the dark card */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] pointer-events-none"></div>

                        <div className="z-10">
                            <h3 className="text-2xl font-semibold mb-6 text-white tracking-widest">Contact Information</h3>
                            
                            <div className="flex flex-col gap-6">
                                <div className="flex items-start">
                                    <MapPinIcon className="h-5 w-5 text-accent mt-1 mr-4 shrink-0" />
                                    <div>
                                        <h4 className="text-white/80 font-medium text-xs uppercase tracking-wider mb-1">Headquarters</h4>
                                        <p className="text-white text-base leading-relaxed">
                                            123 Premium Real Estate Blvd<br/>
                                            Suite 400<br/>
                                            Beverly Hills, CA 90210
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <PhoneIcon className="h-5 w-5 text-accent mt-1 mr-4 shrink-0" />
                                    <div>
                                        <h4 className="text-white/80 font-medium text-xs uppercase tracking-wider mb-1">Direct Line</h4>
                                        <p className="text-white text-base leading-relaxed">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <MailIcon className="h-5 w-5 text-accent mt-1 mr-4 shrink-0" />
                                    <div>
                                        <h4 className="text-white/80 font-medium text-xs uppercase tracking-wider mb-1">Email</h4>
                                        <p className="text-white text-base leading-relaxed">support@pdr.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <ClockIcon className="h-5 w-5 text-accent mt-1 mr-4 shrink-0" />
                                    <div>
                                        <h4 className="text-white/80 font-medium text-xs uppercase tracking-wider mb-1">Business Hours</h4>
                                        <p className="text-white text-base leading-relaxed">
                                            Mon - Fri: 9:00 AM - 6:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
					</div>

					{/* Right: Contact Form Column */}
					<div className="lg:w-[60%] p-8 lg:p-12 bg-white/40 overflow-y-auto">
						<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-1">
									<label htmlFor="first-name" className="block text-[10px] tracking-widest uppercase font-bold text-gray-500">
										First Name
									</label>
									<Input
										id="first-name"
										name="first-name"
										type="text"
										required
										className="appearance-none block w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all h-10"
										placeholder="Jane"
									/>
								</div>
								<div className="space-y-1">
									<label htmlFor="last-name" className="block text-[10px] tracking-widest uppercase font-bold text-gray-500">
										Last Name
									</label>
									<Input
										id="last-name"
										name="last-name"
										type="text"
										required
										className="appearance-none block w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all h-10"
										placeholder="Doe"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-1">
									<label htmlFor="email" className="block text-[10px] tracking-widest uppercase font-bold text-gray-500">
										Email Address
									</label>
									<Input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="appearance-none block w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all h-10"
										placeholder="jane@example.com"
									/>
								</div>
								<div className="space-y-1">
									<label htmlFor="phone" className="block text-[10px] tracking-widest uppercase font-bold text-gray-500">
										Phone Number
									</label>
									<Input
										id="phone"
										name="phone"
										type="tel"
										autoComplete="tel"
										className="appearance-none block w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all h-10"
										placeholder="(555) 000-0000"
									/>
								</div>
							</div>

							<div className="space-y-1">
								<label htmlFor="message" className="block text-[10px] tracking-widest uppercase font-bold text-gray-500">
									How can we help?
								</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="appearance-none block w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all resize-none"
                                    placeholder="Tell us about the property you're looking for..."
                                />
							</div>

							<div className="pt-2">
								<Button
									type="submit"
									className="w-full flex justify-center py-5 px-4 border border-transparent rounded-lg shadow-lg shadow-primary/20 text-sm font-extrabold uppercase tracking-widest text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 h-12"
								>
									Send Message
								</Button>
							</div>
						</form>
					</div>

				</div>
			</motion.div>
		</div>
	);
}
