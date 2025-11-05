import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ full_name: '', email: '', username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.full_name || !form.email || !form.username || !form.password || !form.confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }

    try {
      const res = await axios.post('http://localhost:7000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: 720 }}>
      <h3>Register</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit}>
        <div className="row g-2">
          <div className="col-md-6"><input name="full_name" value={form.full_name} onChange={handle} className="form-control" placeholder="Full Name" /></div>
          <div className="col-md-6"><input name="email" value={form.email} onChange={handle} className="form-control" placeholder="Email" type="email" /></div>
          <div className="col-md-6"><input name="username" value={form.username} onChange={handle} className="form-control" placeholder="Username" /></div>
          <div className="col-md-3"><input name="password" value={form.password} onChange={handle} className="form-control" placeholder="Password" type="password" /></div>
          <div className="col-md-3"><input name="confirmPassword" value={form.confirmPassword} onChange={handle} className="form-control" placeholder="Confirm Password" type="password" /></div>
        </div>
        <div className="text-end mt-3">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
}
