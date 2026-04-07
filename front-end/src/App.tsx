import './App.css';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	BuildingIcon,
	ThumbsUpIcon,
	UsersIcon,
	MicroscopeIcon,
	HamburgerIcon, // Assuming you have a HamburgerIcon component
} from '@/icons/landing-page-icons';
import gifimg from './hello.gif';
import { useState } from 'react';
import { CountUpCard } from './components/countup-card';
import FeaturesSection from './sections/features';
import { PropertiesList } from './sections/properties';
import TestimonialSection from './sections/testimonial';
import Footer from './sections/footer';
import { Link, useNavigate } from 'react-router-dom';

// Define animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
		},
	},
};

const leftItemVariants = {
	hidden: { opacity: 0, x: -100 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: 'tween',
			duration: 0.5,
		},
	},
};

const rightItemVariants = {
	hidden: { opacity: 0, x: 100 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: 'tween',
			duration: 0.5,
		},
	},
};
const links = [
	{ text: 'Buy or Rent', href: '/buy-rent' },
	{ text: 'Sell or List', href: '/sell-list' },
	{ text: 'Home Value', href: '/home-value' },
	{ text: 'Franchise', href: '/franchise' },
];
export default function App() {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const navigate = useNavigate();
	return (
		<div className="w-full overflow-x-hidden">
			<header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-purple-100 shadow-sm transition-all duration-300">
				<nav className="container px-6 py-4 flex justify-between items-center">
					<Link to={'/'} className="group">
						<div className="flex items-center cursor-pointer transition-transform duration-300 group-hover:scale-105">
							<div className="bg-primary/10 p-2 rounded-xl">
								<BuildingIcon className="text-primary h-6 w-6" />
							</div>
							<span className="ml-3 text-2xl font-extrabold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
								Tru
							</span>
							<span className="ml-1 text-sm font-semibold uppercase tracking-widest text-gray-500">
								Real Estate
							</span>
						</div>
					</Link>
					<div className="md:hidden">
						<button onClick={() => setIsNavOpen(!isNavOpen)} className="p-2 rounded-lg bg-gray-50 text-primary hover:bg-gray-100 transition-colors">
							<HamburgerIcon className="h-6 w-6" />
						</button>
					</div>
					<div
						className={`${
							isNavOpen ? 'flex flex-col' : 'hidden'
						} md:flex md:space-x-8 absolute md:static top-full left-0 w-full md:w-auto bg-white/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 shadow-lg md:shadow-none z-10 border-b md:border-none border-gray-100`}
					>
						{links.map(({ text, href }) => (
							<Link
								to={'/listings'}
								className="text-gray-600 font-medium hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full block md:inline-block py-2 md:py-0"
								key={text}
							>
								{text}
							</Link>
						))}
					</div>
					<div className="hidden md:flex items-center gap-4">
						<Button variant="ghost" className="text-gray-600 hover:text-primary hover:bg-primary/5 font-medium">Contact us</Button>
						<Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white rounded-full px-6 shadow-md shadow-primary/20">
							Join
						</Button>
					</div>
				</nav>
			</header>
			<div className="bg-bgColor">
				<motion.div
					className="container px-6 py-16 flex flex-col lg:flex-row justify-between items-center"
					initial="hidden"
					animate="visible"
					variants={containerVariants}
				>
					<motion.div className="lg:w-1/2 lg:mr-4" variants={leftItemVariants}>
						<h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 text-center lg:text-left">
							Explore Some Of The Best Properties In Your Area
						</h1>
						<p className="text-gray-600 mb-6 text-center lg:text-left">
							Discover premium residences that best suit your needs and
							lifestyle, from elegance to modern luxury.
						</p>
						<motion.div
							className="flex items-center bg-white shadow-lg rounded-full overflow-hidden border border-gray-100 p-1 pl-4"
							variants={leftItemVariants}
						>
							<Input
								placeholder="Search properties in your city"
								className="flex-grow px-4 py-3 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none shadow-none text-gray-800 placeholder:text-gray-400 text-base"
							/>
							<Button className="bg-purple-800 hover:bg-purple-900 text-white h-12 w-12 rounded-full opacity-100 transition-colors flex items-center justify-center shadow-md">
								<MicroscopeIcon className="h-5 w-5 font-bold" />
							</Button>
						</motion.div>
						<motion.div
							className="mt-8 grid grid-cols-3 gap-2 md:gap-8 text-center"
							variants={leftItemVariants}
						>
							<CountUpCard icon={BuildingIcon} end={1500} label="Apartments" />
							<CountUpCard icon={UsersIcon} end={1000} label="Customers" />
							<CountUpCard
								icon={ThumbsUpIcon}
								end={2500}
								label="Good reviews"
							/>
						</motion.div>
					</motion.div>
					<motion.div
						className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end"
						variants={rightItemVariants}
					>
						<img
							// src="https://giphy.com/embed/ZCkD0qVCXkWXtiBGUT"
							src={gifimg}
							// width="480"
							// height="360"
							// frameBorder="0"
							className="rounded-lg shadow-lg w-full  object-cover bg-cover"
							// allowFullScreen
						></img>
					</motion.div>
				</motion.div>
			</div>
			<div className="flex mt-6 flex-col gap-6 w-full">
				<PropertiesList />
				<FeaturesSection />
				<TestimonialSection />
				<Footer />
			</div>
		</div>
	);
}
