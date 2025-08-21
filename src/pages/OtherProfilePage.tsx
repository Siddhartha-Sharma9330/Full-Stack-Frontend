import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OtherProfilePage() {
  const { userId } = useParams();
  const [state, setState] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token || !userId) return setLoading(false);
        const { data } = await axios.get(`http://localhost:3000/api/profile/user/${userId}/view`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setState(data);
      } catch (e) {
        console.error('Failed to load profile', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!state) return <div style={{ padding: 24 }}>Profile not found.</div>;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ maxWidth: 860, margin: '0 auto', background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <img
            src={state.profilePicture ? (state.profilePicture.startsWith('http') ? state.profilePicture : `http://localhost:3000${state.profilePicture}`) : 'https://via.placeholder.com/96'}
            alt="avatar"
            style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <h2 style={{ margin: 0 }}>{state.user?.name || 'Unnamed'}</h2>
            <div style={{ color: '#666' }}>{state.user?.email}</div>
            <div style={{ color: '#666' }}>{state.user?.role}</div>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <h3>About</h3>
          <div>{state.bio || 'No bio yet.'}</div>
        </div>

        <div style={{ marginTop: 16 }}>
          <h3>Skills</h3>
          {state.skills?.length ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {state.skills.map((s: any, i: number) => (
                <span key={i} style={{ background: '#f4f6f8', padding: '6px 10px', borderRadius: 999 }}>{s.name} · {s.level}</span>
              ))}
            </div>
          ) : 'No skills'}
        </div>
      </div>
    </div>
  );
}

export default OtherProfilePage;


