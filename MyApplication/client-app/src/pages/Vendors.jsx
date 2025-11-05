import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Vendors(){
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ vendorName: '', shopName: '', category: '', contact: '', rating: '' });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(()=> { fetchVendors(); }, []);

  const fetchVendors = () => {
    axios.get('https://exp9-backend-2553.onrender.com/api/getVendors')
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));
  };

  const addVendor = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://exp9-backend-2553.onrender.com/api/addVendor', form, { headers: { Authorization: `Bearer ${token}` } });
      setMessage(res.data.status);
      setForm({ vendorName: '', shopName: '', category: '', contact: '', rating: '' });
      fetchVendors();
    } catch (err) {
      setMessage(err.response?.data?.status || 'Error');
    }
  };

  const deleteVendor = async (id) => {
    try {
      await axios.post('https://exp9-backend-2553.onrender.com/api/deleteVendor', { id }, { headers: { Authorization: `Bearer ${token}` } });
      fetchVendors();
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <div className="card p-4 mb-3">
        <h4>Add Vendor</h4>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={addVendor} className="row g-2">
          <div className="col-md-3"><input className="form-control" placeholder="Vendor Name" value={form.vendorName} onChange={(e)=>setForm({...form, vendorName:e.target.value})} required/></div>
          <div className="col-md-3"><input className="form-control" placeholder="Shop Name" value={form.shopName} onChange={(e)=>setForm({...form, shopName:e.target.value})} required/></div>
          <div className="col-md-2"><input className="form-control" placeholder="Category" value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})}/></div>
          <div className="col-md-2"><input className="form-control" placeholder="Contact" value={form.contact} onChange={(e)=>setForm({...form, contact:e.target.value})}/></div>
          <div className="col-md-1"><input className="form-control" placeholder="Rating" value={form.rating} onChange={(e)=>setForm({...form, rating:e.target.value})}/></div>
          <div className="col-md-1"><button className="btn btn-success w-100">Add</button></div>
        </form>
      </div>

      <div className="card p-3">
        <h4>Vendors</h4>
        <table className="table table-striped">
          <thead><tr><th>#</th><th>Name</th><th>Shop</th><th>Category</th><th>Contact</th><th>Rating</th><th>Action</th></tr></thead>
          <tbody>
            {vendors.map((v,i)=>(
              <tr key={v._id}>
                <td>{i+1}</td>
                <td>{v.vendorName}</td>
                <td>{v.shopName}</td>
                <td>{v.category}</td>
                <td>{v.contact}</td>
                <td>{v.rating}</td>
                <td><button className="btn btn-danger btn-sm" onClick={()=>deleteVendor(v._1d || v._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
