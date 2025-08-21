import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./ProfileEditPage.css";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

interface Skill { name: string; level: SkillLevel }
interface JWTBody { id: string; role: string }

function ProfileEditPage() {
  const [profileId, setProfileId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [portfolioUrl, setPortfolio] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [portfolioTouched, setPortfolioTouched] = useState(false);

  useEffect(() => {
    async function load() {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;
      const { id } = jwtDecode<JWTBody>(accessToken);
      setUserId(id);
      const { data } = await axios.get(`http://localhost:3000/api/profile/user/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setProfileId(data._id);
      setName(data?.user?.name || "");
      setEmail(data?.user?.email || "");
      setBio(data?.bio || "");
      setPortfolio(data?.portfolioUrl || "");
      setGithub(data?.github || "");
      setLinkedin(data?.linkedin || "");
      setSkills(data?.skills || []);
    }
    load();
  }, []);

  const addSkill = () => setSkills((prev) => [...prev, { name: "", level: "Beginner" }]);
  const removeSkill = (idx: number) => setSkills((prev) => prev.filter((_, i) => i !== idx));
  const updateSkill = (idx: number, key: keyof Skill, value: string) =>
    setSkills((prev) => prev.map((s, i) => (i === idx ? { ...s, [key]: value } : s)));

  const save = async () => {
    try {
      setIsSaving(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      if (name) {
        await axios.put(
          `http://localhost:3000/users/profile/${userId}`,
          { name },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      }

      // Filter out empty skill names
      const filteredSkills = skills.filter((s) => s.name.trim().length > 0);

      await axios.put(
        `http://localhost:3000/api/profile/${profileId}`,
        { bio, portfolioUrl, github, linkedin, skills: filteredSkills },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (uploadFile) {
        const fd = new FormData();
        fd.append("profilePicture", uploadFile);
        await axios.post(
          `http://localhost:3000/api/profile/${profileId}/upload-picture`,
          fd,
          { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" } }
        );
      }

      window.location.href = "/profile";
    } finally {
      setIsSaving(false);
    }
  };

  const isValidUrl = (value: string) => {
    if (!value) return true;
    try {
      // Accept either full URL or domain starting with http(s)
      // If user entered without protocol, try to coerce
      const url = value.match(/^https?:\/\//) ? value : `https://${value}`;
      // eslint-disable-next-line no-new
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isNameInvalid = nameTouched && name.trim().length === 0;
  const isPortfolioInvalid = portfolioTouched && !isValidUrl(portfolioUrl);

  return (
    <div className="profile-edit-wrapper">
      <h2 className="profile-edit-title">Edit Profile</h2>
      <div className="profile-edit-card">
        <div className="profile-edit-grid">
        <div className="form-item">
          <label className="form-label">Full Name</label>
          <input
            className={`form-input${isNameInvalid ? " is-invalid" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameTouched(true)}
            placeholder="Enter your full name"
          />
          {isNameInvalid && <div className="helper-text">Full name is required</div>}
        </div>
        <div className="form-item">
          <label className="form-label">Email</label>
          <input className="form-input" value={email} disabled />
        </div>
        <div className="form-item form-span-2">
          <label className="form-label">About me</label>
          <textarea className="form-textarea" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
        </div>
        <div className="form-item">
          <label className="form-label">Portfolio</label>
          <input
            className={`form-input${isPortfolioInvalid ? " is-invalid" : ""}`}
            value={portfolioUrl}
            onChange={(e) => setPortfolio(e.target.value)}
            onBlur={() => setPortfolioTouched(true)}
            placeholder="https://your-portfolio.com"
          />
          {isPortfolioInvalid && <div className="helper-text">Enter a valid URL</div>}
        </div>
        <div className="form-item">
          <label className="form-label">Github</label>
          <input className="form-input" value={github} onChange={(e) => setGithub(e.target.value)} />
        </div>
        <div className="form-item">
          <label className="form-label">LinkedIn</label>
          <input className="form-input" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
        </div>
        <div className="form-item form-span-2">
          <label className="form-label">Profile picture</label>
          <input className="form-file" type="file" accept="image/*" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
        </div>
        </div>
      </div>

      <div className="profile-edit-card skills-section">
        <h3 className="section-title">Skills</h3>
        {skills.map((s, idx) => (
          <div key={idx} className="skill-row">
            <input className="form-input" value={s.name} onChange={(e) => updateSkill(idx, "name", e.target.value)} placeholder="Skill" />
            <select className="form-select" value={s.level} onChange={(e) => updateSkill(idx, "level", e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <button className="btn btn-danger" onClick={() => removeSkill(idx)}>Remove</button>
          </div>
        ))}
        <button className="btn btn-secondary" onClick={addSkill}>Add skill</button>
      </div>

      <div className="actions">
        <button className="btn" onClick={() => (window.location.href = "/profile")}>Cancel</button>
        <button className="btn btn-primary" onClick={save} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}

export default ProfileEditPage;


