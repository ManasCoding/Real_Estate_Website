import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'Apartment',
    status: 'For Sale',
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
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value.toString());
    });

    images.forEach((image) => {
      submitData.append('images', image);
    });

    try {
      const response = await fetch('http://localhost:5000/api/admin/properties', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        setMessage('Property uploaded successfully!');
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
          type: 'Apartment',
          status: 'For Sale',
          bedrooms: '',
          bathrooms: '',
          area: ''
        });
        setImages([]);
      } else {
        setMessage('Failed to upload property.');
      }
    } catch (error) {
      console.error('Error uploading property:', error);
      setMessage('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl mt-12 bg-white shadow-lg rounded-xl flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Admin Console</h1>
            <p className="text-gray-500 text-center">Upload new properties to the database</p>
            
            {message &&
      <div className={`p-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
      }

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700">Property Title</label>
                    <Input name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Modern Villa in Suburbs" />
                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700">Description</label>
                    <Input name="description" value={formData.description} onChange={handleInputChange} required placeholder="Spacious 3BHK..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Price ($)</label>
                        <Input name="price" type="number" value={formData.price} onChange={handleInputChange} required placeholder="500000" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Location</label>
                        <Input name="location" value={formData.location} onChange={handleInputChange} required placeholder="New York, NY" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Type</label>
                        <select name="type" value={formData.type} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option>Apartment</option>
                            <option>House</option>
                            <option>Villa</option>
                            <option>Commercial</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Status</label>
                        <select name="status" value={formData.status} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option>For Sale</option>
                            <option>For Rent</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Bedrooms</label>
                        <Input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleInputChange} placeholder="3" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Bathrooms</label>
                        <Input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleInputChange} placeholder="2" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Area (sqft)</label>
                        <Input name="area" type="number" value={formData.area} onChange={handleInputChange} placeholder="1500" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700">Upload Images</label>
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} className="p-2 border rounded-md" />
                </div>

                <Button type="submit" disabled={loading} className="mt-4 bg-primary text-white hover:bg-primary/90">
                    {loading ? 'Uploading...' : 'Submit Property'}
                </Button>
            </form>
        </div>);

};

export default AdminPage;