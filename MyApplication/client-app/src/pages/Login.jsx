import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!identifier || !password) { setError('Please fill all fields'); return; }
    try {
      const res = await axios.post('http://localhost:7000/api/auth/login', { identifier, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: 480 }}>
      <h3>Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit}>
        <div className="mb-2"><input className="form-control" value={identifier} onChange={(e)=>setIdentifier(e.target.value)} placeholder="Username or Email" /></div>
        <div className="mb-2"><input className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" /></div>
        <div className="text-end"><button className="btn btn-primary">Login</button></div>
      </form>
    </div>
  );
}
