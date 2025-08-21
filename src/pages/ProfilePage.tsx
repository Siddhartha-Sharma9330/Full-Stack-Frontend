import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { parseCSSVariable, px } from "framer-motion";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

interface Skill {
  name: string;
  level: SkillLevel;
}

interface UserLite {
  _id: string;
  name?: string;
  email: string;
  role: string;
  createdAt?: string;
}

interface UserProfile {
  _id: string;
  user: UserLite;
  bio: string;
  profilePicture: string;
  skills: Skill[];
  github: string;
  linkedin: string;
  portfolioUrl: string;
}

interface JWTBody { id: string; role: string }

function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setIsLoading(false);
          return;
        }
        const { id } = jwtDecode<JWTBody>(accessToken);
        const { data } = await axios.get(
          `http://localhost:3000/api/profile/user/${id}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setProfile(data);
      } catch (e) {
        console.error("Failed to fetch profile", e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const getProfileImageUrl = (path?: string) => {
    if (!path) return "";
    if (/^https?:\/\//.test(path)) return path;
    if (path.startsWith("/")) return `http://localhost:3000${path}`;
    return `http://localhost:3000/${path}`;
  };

  if (isLoading) return <div style={{ padding: 24 }}>Loading profile...</div>;
  if (!profile) return <div style={{ padding: 24 }}>No profile found.</div>;

  return (
    <div style={{ padding: 24, background: "blanchedalmond" }}>
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24 }}>
        {/* Left card */}
        <div style={{ background: "#fff", borderRadius: 8, padding: 24, height: "fit-content", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <img
              src={getProfileImageUrl(profile.profilePicture) || "https://via.placeholder.com/160"}
              alt="profile"
              style={{ width: 160, height: 160, borderRadius: "50%", objectFit: "cover" }}
            />
            <h2 style={{ margin: 0 }}>{profile.user.name || "Unnamed User"}</h2>
            <div style={{ color: "#666" }}>{profile.user.role === "admin" ? "Administrator" : "Professional"}</div>
            <div style={{ color: "#777" }}>{profile.user.email}</div>
            <a href="/profile/edit" style={{ marginTop: 8, textDecoration: "none", background: "#1677ff", color: "#fff", padding: "8px 16px", borderRadius: 6 }}>Edit</a>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ display: "grid", gap: 12 }}>
              <a href={profile.portfolioUrl || "#"} target="_blank" rel="noreferrer" style={{ color: "#1677ff" }}>Website</a>
              <a href={profile.github ? `https://github.com/${profile.github}` : "#"} target="_blank" rel="noreferrer" style={{ color: "#1677ff" }}>Github</a>
              <a href={profile.linkedin ? `https://linkedin.com/in/${profile.linkedin}` : "#"} target="_blank" rel="noreferrer" style={{ color: "#1677ff" }}>LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "grid", gap: 24 }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <h3 style={{ marginTop: 0 }}>Profile Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", rowGap: 12 }}>
              <div style={{ color: "#888" }}>Full Name</div>
              <div>{profile.user.name || "-"}</div>
              <div style={{ color: "#888" }}>Email</div>
              <div>{profile.user.email}</div>
              <div style={{ color: "#888" }}>Role</div>
              <div>{profile.user.role}</div>
              <div style={{ color: "#888" }}>Portfolio</div>
              <div>{profile.portfolioUrl || "Not provided"}</div>
              <div style={{ color: "#888" }}>Github</div>
              <div>{profile.github || "Not provided"}</div>
              <div style={{ color: "#888" }}>LinkedIn</div>
              <div>{profile.linkedin || "Not provided"}</div>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <h3 style={{ marginTop: 0 }}>Skills</h3>
            {profile.skills?.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {profile.skills.map((s, idx) => (
                  <span key={idx} style={{ background: "#f4f6f8", padding: "6px 10px", borderRadius: 999 }}>{s.name} · {s.level}</span>
                ))}
              </div>
            ) : (
              <div style={{ color: "#888" }}>No skills added yet.</div>
            )}
          </div>

          <div style={{ background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <h3 style={{ marginTop: 0 }}>About</h3>
            <div style={{ whiteSpace: "pre-wrap" }}>{profile.bio || "No bio yet."}</div>
          </div>

        </div>
      </div>
      
      {/* People you may know - full width across the page */}
      <div style={{ marginTop: 24 }}>
        <PeopleYouMayKnow />
      </div>
    </div>
  );
}

export default ProfilePage;

function PeopleYouMayKnow() {
  const [items, setItems] = React.useState<Array<{
    profileId: string;
    user: { _id: string; name?: string; email: string; role: string };
    profilePicture?: string;
    bio?: string;
    skills?: { name: string; level: string }[];
  }>>([]);

  React.useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        const { data } = await axios.get('http://localhost:3000/api/profile/suggestions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(data || []);
      } catch (e) {
        console.error('Failed to load suggestions', e);
      }
    }
    load();
  }, []);

  const openProfile = async (userId: string) => {
    // Navigate to view-only profile of another user in a new tab
    window.open(`/profile/view/${userId}`, '_blank');
  };

  if (!items.length) return null;

  return (
         <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
       <h3 style={{ marginTop: 0 }}>People you may know</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {items.map((p) => (
          <div key={p.profileId} onClick={() => openProfile(p.user._id)} style={{ cursor: 'pointer', border: '1px solid #eee', borderRadius: 8, padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
            <img
              src={p.profilePicture ? (p.profilePicture.startsWith('http') ? p.profilePicture : `http://localhost:3000${p.profilePicture}`) : 'https://via.placeholder.com/56'}
              alt="avatar"
              style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontWeight: 600 }}>{p.user.name || 'Unnamed'}</div>
              <div style={{ color: '#666', fontSize: 13 }}>{p.user.email}</div>
              {p.skills?.length ? (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {p.skills.slice(0, 2).map((s, idx) => (
                    <span key={idx} style={{ background: '#f4f6f8', padding: '2px 6px', borderRadius: 999, fontSize: 12 }}>{s.name}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
