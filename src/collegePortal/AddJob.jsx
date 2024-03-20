import { useState, useEffect } from 'react';
import api from '../Api/Api';
import toast from 'react-hot-toast';

const AddJob = () => {
    const [formData, setFormData] = useState({
        cname: '',
        jobRole: [],
        logoUrl: '',
        eligibility: '',
        applicationDeadline: '',
        companyVisitDate: '',
        description: ''
    });

    const [companyNames, setCompanyNames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyNames = async () => {
            try {
                const response = await api.get('/all-company-names');
                setCompanyNames(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching company names:', error.message);
                toast.error('Failed to fetch company names');
            }
        };

        fetchCompanyNames();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'jobRole' ? value.split(',').map(role => role.trim()) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Adding company...");

        try {
            const response = await api.post('/add-company', formData);
            if (response.data) {
                toast.success('Company added successfully');
                setFormData({
                    cname: '',
                    jobRole: [],
                    logoUrl: '',
                    eligibility: '',
                    applicationDeadline: '',
                    companyVisitDate: ''
                });
            }
        } catch (error) {
            console.error('Error adding company:', error.message);
            toast.error(error.response?.data?.error || 'Failed to add company');
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    const capitalizeCompany = (name) => {
        return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="max-w-lg mx-auto mt-8">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4">Add Job</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="cname" className="block font-semibold">Company Name</label>
                        <select id="cname" name="cname" value={formData.cname} onChange={handleChange} className="border border-gray-300 px-3 py-2 w-full rounded-md">
                            {loading ? (
                                <option value="" disabled>Loading...</option>
                            ) : (
                                <>
                                    <option value="" disabled>Select Company Name</option>
                                    {companyNames.map(companyName => (
                                        <option key={companyName} value={companyName}>{capitalizeCompany(companyName)}</option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="jobRole" className="block font-semibold">Job Role</label>
                        <input type="text" id="jobRole" name="jobRole" value={formData.jobRole.join(', ')} onChange={handleChange} className="border border-gray-300 px-3 py-2 w-full rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="logoUrl" className="block font-semibold">Logo URL</label>
                        <input type="text" id="logoUrl" name="logoUrl" value={formData.logoUrl} onChange={handleChange} className="border border-gray-300 px-3 py-2 w-full rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="eligibility" className="block font-semibold">Eligibility</label>
                        <input type="text" id="eligibility" name="eligibility" value={formData.eligibility} onChange={handleChange} className="border border-gray-300 px-3 py-2 w-full rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-semibold">description</label>
                        <textarea type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="border border-gray-300 px-3 py-2 w-full rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="applicationDeadline" className="block font-semibold">Application Deadline</label>
                        <input type="date" id="applicationDeadline" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} className="border border-gray-300 px-3 py-2 w-full rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor="companyVisitDate" className="block font-semibold">Company Visit Date</label>
                        <input type="date" id="companyVisitDate" name="companyVisitDate" value={formData.companyVisitDate} onChange={handleChange} className="border border-gray-300 px-3 py-2 w-full rounded-md" required />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddJob;
