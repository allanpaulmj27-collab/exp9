import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Products(){
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ productName: '', description: '', price: '', category: '', vendorId: '', available: true });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(()=> {
    fetchProducts();
    fetchVendors();
  }, []);

  const fetchProducts = () => {
    axios.get('https://exp9-backend-2553.onrender.com/api/getProducts')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  const fetchVendors = () => {
    axios.get('https://exp9-backend-2553.onrender.com/api/getVendors')
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://exp9-backend-2553.onrender.com/api/addProduct', form, { headers: { Authorization: `Bearer ${token}` } });
      setMessage(res.data.status);
      setForm({ productName: '', description: '', price: '', category: '', vendorId: '', available: true });
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.status || 'Error');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.post('https://exp9-backend-2553.onrender.com/api/deleteProduct', { id }, { headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <div className="card p-4 mb-3">
        <h4>Add Product</h4>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={addProduct} className="row g-2">
          <div className="col-md-3"><input className="form-control" placeholder="Product Name" value={form.productName} onChange={(e)=>setForm({...form, productName:e.target.value})} required/></div>
          <div className="col-md-3"><input className="form-control" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})}/></div>
          <div className="col-md-2"><input className="form-control" placeholder="Price" type="number" step="0.01" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} required/></div>
          <div className="col-md-2">
            <select className="form-select" value={form.vendorId} onChange={(e)=>setForm({...form, vendorId:e.target.value})} required>
              <option value="">Select Vendor</option>
              {vendors.map(v=> <option key={v._id} value={v._id}>{v.shopName}</option>)}
            </select>
          </div>
          <div className="col-md-1"><button className="btn btn-success w-100">Add</button></div>
        </form>
      </div>

      <div className="card p-3">
        <h4>Products</h4>
        <table className="table table-striped">
          <thead><tr><th>#</th><th>Name</th><th>Vendor</th><th>Price</th><th>Available</th><th>Action</th></tr></thead>
          <tbody>
            {products.map((p,i)=>(
              <tr key={p._id}>
                <td>{i+1}</td>
                <td>{p.productName}</td>
                <td>{p.vendor?.shopName || '—'}</td>
                <td>{p.price}</td>
                <td>{p.available ? 'Yes' : 'No'}</td>
                <td><button className="btn btn-danger btn-sm" onClick={()=>deleteProduct(p._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
