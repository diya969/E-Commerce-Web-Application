import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getProfile, updateProfile } from "../services/api";

function Profile() {
  const { user, login } = useAuth();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getProfile()
      .then((res) => {
        setName(res.data.name || "");
        setAddress(res.data.address || "");
      })
      .catch(() => setError("Could not load profile."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await updateProfile({ name, address });
      // Update the name shown in sidebar by refreshing stored user
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      stored.name = res.data.name;
      localStorage.setItem("user", JSON.stringify(stored));
      window.dispatchEvent(new Event("storage"));
      setMessage("Profile updated successfully.");
    } catch {
      setError("Could not save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="status-message">Loading profile...</p>;

  return (
    <div className="page profile-page">
      <h1>My Profile</h1>

      <form className="profile-card" onSubmit={handleSave}>
        <div className="profile-section-title">Account details</div>

        <div className="form-group">
          <label htmlFor="profile-email">Email</label>
          <input
            id="profile-email"
            type="email"
            value={user?.email || ""}
            disabled
            className="input-disabled"
          />
          <span className="input-hint">Email cannot be changed.</span>
        </div>

        <div className="form-group">
          <label htmlFor="profile-name">Name</label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="profile-section-title" style={{ marginTop: "1.5rem" }}>
          Delivery address
        </div>

        <div className="form-group">
          <label htmlFor="profile-address">Full address</label>
          <textarea
            id="profile-address"
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House / flat no., Street, City, State, PIN code"
          />
          <span className="input-hint">
            This address will be pre-filled at checkout.
          </span>
        </div>

        {message && <p className="form-success">{message}</p>}
        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}

export default Profile;