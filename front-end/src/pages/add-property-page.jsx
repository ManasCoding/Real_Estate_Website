import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { BuildingIcon, Pin } from '@/icons/landing-page-icons';
import { Link } from 'react-router-dom';
import GlobalHeader from '../components/layout/GlobalHeader';

const AddPropertyPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'apartment',
    status: 'sale',
    bedrooms: '',
    bathrooms: '',
    area: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const submitData = new FormData();
    // Normalize fields for the backend Property model
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('price', formData.price);
    submitData.append('city', formData.location);
    submitData.append('type', formData.type);
    submitData.append('status', formData.status);
    submitData.append('bedrooms', formData.bedrooms);
    submitData.append('bathrooms', formData.bathrooms);
    submitData.append('area', formData.area);

    images.forEach((image) => {
      submitData.append('images', image);
    });

    try {
      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        setMessage('Property listed successfully! It will appear on the platform soon.');
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
          type: 'apartment',
          status: 'sale',
          bedrooms: '',
          bathrooms: '',
          area: ''
        });
        setImages([]);
      } else {
        const error = await response.json();
        setMessage(`Submission failed: ${error.message || 'Check all fields.'}`);
      }
    } catch (error) {
      console.error('Error listing property:', error);
      setMessage('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 overflow-x-hidden">
        <GlobalHeader />

        <div className="container mx-auto px-4 max-w-4xl">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100"
            >
                <div className="grid grid-cols-1 md:grid-cols-5">
                    {/* Sidebar / Info */}
                    <div className="md:col-span-2 bg-gradient-to-br from-orange-500 to-orange-400 p-10 text-white flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-extrabold mb-6 leading-tight uppercase tracking-tighter">List Your <br/>Premium <br/>Property</h1>
                            <p className="text-white/80 leading-relaxed mb-8 font-medium">
                                Connect with qualified buyers and tenants across our global network. Our premium dashboard makes listing simple and fast.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                       <span className="font-bold text-sm">01</span>
                                    </div>
                                    <span className="font-bold text-sm uppercase tracking-wider">Verified Listings</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                       <span className="font-bold text-sm">02</span>
                                    </div>
                                    <span className="font-bold text-sm uppercase tracking-wider">Luxury Buyer Pool</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                       <span className="font-bold text-sm">03</span>
                                    </div>
                                    <span className="font-bold text-sm uppercase tracking-wider">Premium Support</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/20">
                             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-4">Architectural Excellence</p>
                             <div className="flex -space-x-2">
                                 {[1,2,3,4].map(i => (
                                     <div key={i} className="w-8 h-8 rounded-full border-2 border-orange-500 bg-white/20 " />
                                 ))}
                                 <div className="ml-4 text-[10px] font-black uppercase tracking-widest self-center text-white">+ 1,500 Partners</div>
                             </div>
                        </div>
                    </div>

                    {/* Form Block */}
                    <div className="md:col-span-3 p-10">
                        {message && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`mb-8 p-6 rounded-2xl flex items-center gap-4 ${message.includes('success') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.includes('success') ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                                    {message.includes('success') ? '✓' : '!'}
                                </div>
                                <p className="font-bold text-sm">{message}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Property Highlight</label>
                                <Input 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleInputChange} 
                                    required 
                                    placeholder="e.g. Skyline Minimalist Penthouse" 
                                    className="rounded-xl border-gray-100 bg-gray-50/50 py-6 px-5 focus:ring-orange-500/20 font-bold text-[#1b436e]"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Architectural Description</label>
                                <textarea 
                                    name="description" 
                                    value={formData.description} 
                                    onChange={handleInputChange} 
                                    required 
                                    rows={3}
                                    placeholder="Describe the aesthetic and key features..." 
                                    className="flex w-full rounded-xl border border-gray-100 bg-gray-50/50 px-5 py-4 text-sm font-bold text-[#1b436e] ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 transition-all resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Asking Price ($)</label>
                                    <Input 
                                        name="price" 
                                        type="number" 
                                        value={formData.price} 
                                        onChange={handleInputChange} 
                                        required 
                                        placeholder="0.00" 
                                        className="rounded-xl border-gray-100 bg-gray-50/50 py-6 px-5 font-bold text-[#1b436e]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">City / Location</label>
                                    <Input 
                                        name="location" 
                                        value={formData.location} 
                                        onChange={handleInputChange} 
                                        required 
                                        placeholder="e.g. Manhattan, NY" 
                                        className="rounded-xl border-gray-100 bg-gray-50/50 py-6 px-5 font-bold text-[#1b436e]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Asset Type</label>
                                    <select 
                                        name="type" 
                                        value={formData.type} 
                                        onChange={handleInputChange} 
                                        className="flex h-[52px] w-full rounded-xl border border-gray-100 bg-gray-50/50 px-5 py-2 text-sm font-bold text-[#1b436e] focus:ring-2 focus:ring-orange-500/20 outline-none cursor-pointer"
                                    >
                                        <option value="apartment">Apartment</option>
                                        <option value="house">House</option>
                                        <option value="villa">Villa</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="plot">Plot / Land</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Listing Status</label>
                                    <select 
                                        name="status" 
                                        value={formData.status} 
                                        onChange={handleInputChange} 
                                        className="flex h-[52px] w-full rounded-xl border border-gray-100 bg-gray-50/50 px-5 py-2 text-sm font-bold text-[#1b436e] focus:ring-2 focus:ring-orange-500/20 outline-none cursor-pointer"
                                    >
                                        <option value="sale">For Sale</option>
                                        <option value="rent">For Rent</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Beds</label>
                                    <Input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleInputChange} className="rounded-xl border-gray-100 bg-gray-50/50 py-6 px-5 font-bold text-[#1b436e]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Baths</label>
                                    <Input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleInputChange} className="rounded-xl border-gray-100 bg-gray-50/50 py-6 px-5 font-bold text-[#1b436e]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Sqft</label>
                                    <Input name="area" type="number" value={formData.area} onChange={handleInputChange} className="rounded-xl border-gray-100 bg-gray-50/50 py-6 px-5 font-bold text-[#1b436e]" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 ml-1">Media Gallery</label>
                                <div className="border-2 border-dashed border-gray-100 rounded-[2rem] p-8 text-center bg-gray-50/30 hover:bg-white hover:border-orange-500/20 transition-all cursor-pointer relative">
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                    />
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-50">
                                        <span className="text-2xl text-orange-500 font-black">+</span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-700">Drop your architectural photos here</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">{images.length > 0 ? `${images.length} files attached` : 'Max 10 files allowed'}</p>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full py-8 text-lg font-black bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-2xl shadow-xl shadow-orange-500/30 hover:opacity-90 transition-all transform active:scale-[0.98] uppercase tracking-widest"
                            >
                                {loading ? 'Processing Submission...' : 'Publish Property Listing'}
                            </Button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

export default AddPropertyPage;
