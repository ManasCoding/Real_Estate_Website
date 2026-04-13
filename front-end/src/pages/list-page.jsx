import postsData from './postsData.json';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from './components/list-page/Card';
import { Filter } from './components/list-page/filter-section';
import Map from './components/list-page/map/Map';
import {
  BuildingIcon,
  HamburgerIcon,
  FilterIcon } from
'@/icons/landing-page-icons'; 
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function ListPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        if (!response.ok) throw new Error('API failed');
        const result = await response.json();
        // Backend returns { data: [...], meta: {...} }
        setProperties(result.data && result.data.length > 0 ? result.data : postsData);
      } catch (error) {
        console.error('Failed to fetch from backend, using fallback data:', error);
        setProperties(postsData);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const links = [
    { text: 'Buy or Rent', href: '/buy-rent' },
    { text: 'Sell or List', href: '/sell-list' },
    { text: 'Contact us', href: '/contact' }
  ];

  return (
    <div>
			<nav className="px-4 md:px-32 py-4 flex justify-between items-center bg-white border-b border-gray-100">
				<Link to={'/'}>
					<div className="flex items-center cursor-pointer">
						<BuildingIcon className="text-orange-500 h-8 w-8" />
						<span className="ml-3 text-2xl font-black uppercase tracking-widest text-gray-900 leading-tight">
							PDR
						</span>
						<span className="ml-1 text-sm font-bold uppercase tracking-widest text-gray-400">
							Real Estate
						</span>
					</div>
				</Link>
				<div className="md:hidden flex gap-4 items-center">
					<button onClick={() => setIsFilterOpen(!isFilterOpen)}>
						<FilterIcon className="h-6 w-6 text-gray-800 mr-8" />
					</button>
					<button onClick={() => setIsNavOpen(!isNavOpen)}>
						<HamburgerIcon className="h-6 w-6 text-gray-800" />
					</button>
				</div>
				<div
          className={`${
          isNavOpen ? 'flex flex-col' : 'hidden'} md:flex md:space-x-8 absolute md:static top-20 left-0 w-full md:w-auto bg-white p-6 md:p-0 shadow-xl md:shadow-none z-50`}
          >
					{links.map(({ text, href }) =>
          <Link
            to={href || '/listings'}
            className="text-gray-900 font-bold hover:text-orange-500 transition-colors block md:inline-block py-2"
            key={text}>
								{text}
						</Link>
          )}
				</div>
				<div className="hidden md:flex gap-2">
					<Button className="bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest px-8 py-6 rounded-md transition-all active:scale-95 shadow-lg shadow-orange-500/20">
						Join Us
					</Button>
				</div>
			</nav>
			<div className="flex flex-col lg:flex-row px-4 md:px-32 pt-10">
				<div className="flex-1 px-4">
					<div className="max-w-screen-lg mx-auto">
						<div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
							<Filter />
						</div>
						<div className="mt-10 mb-6">
							<h1 className="text-3xl font-black text-gray-900 tracking-tight">Available Properties</h1>
							<p className="text-gray-500 font-medium">Found {properties.length} results in your area</p>
						</div>
						<Suspense fallback={<p>Loading properties...</p>}>
							<motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 pb-20">
                
								{loading ? (
									<div className="col-span-full py-20 text-center font-bold text-gray-400">Loading live property data...</div>
								) : (
									properties.map((post) => (
										<motion.div key={post.id || post._id} variants={cardVariants}>
											<Card item={post} />
										</motion.div>
									))
								)}
							</motion.div>
						</Suspense>
					</div>
				</div>
				<div className="w-full lg:w-1/3 h-[80vh] lg:sticky top-32 mt-6 lg:mt-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-100 mb-10">
					<Suspense fallback={<p>Loading map view...</p>}>
						<Map items={properties} />
					</Suspense>
				</div>
			</div>
		</div>);
}

export default ListPage;