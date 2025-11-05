import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard(){
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    axios.get('http://localhost:7000/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUser(res.data.user))
      .catch(() => { localStorage.removeItem('token'); navigate('/login'); });
  }, [token, navigate]);

  const logout = () => { localStorage.removeItem('token'); navigate('/'); };

  if (!user) return <div className="card p-4">Loading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Dashboard</h3>
        <div>
          <Link className="btn btn-outline-primary me-2" to="/vendors">Manage Vendors</Link>
          <Link className="btn btn-outline-success me-2" to="/products">Manage Products</Link>
          <button onClick={logout} className="btn btn-danger">Logout</button>
        </div>
      </div>

      <div className="card p-4">
        <p><strong>Full Name:</strong> {user.full_name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
}
