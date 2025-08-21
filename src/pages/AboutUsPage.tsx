import aboutImage from "../Images/Handshake.jpeg";
import { WorldMap } from "../../TextAnimations/TextType/WorldMap";

function AboutUsPage() {
  const mapConnections = [
    {
      start: { lat: 40.7128, lng: -74.0060, label: "New York" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" }
    },
    {
      start: { lat: 51.5074, lng: -0.1278, label: "London" },
      end: { lat: 48.8566, lng: 2.3522, label: "Paris" }
    },
    {
      start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
      end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" }
    },
    {
      start: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" }
    },
    {
      start: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
      end: { lat: 19.0760, lng: 72.8777, label: "Mumbai" }
    },
    {
      start: { lat: 19.0760, lng: 72.8777, label: "Mumbai" },
      end: { lat: -15.7975, lng: -47.8919, label: "Brasília" }
    },
    {
      start: { lat: -15.7975, lng: -47.8919, label: "Brasília" },
      end: { lat: 40.7128, lng: -74.0060, label: "New York" }
    },
    {
      start: { lat: 40.7128, lng: -74.0060, label: "New York" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" }
    }
  ];

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Building the Future,<br />
            <span className="highlight">Together</span>
          </h1>
          <p className="hero-description">
            We're a passionate team of innovators, creators, and problem-solvers dedicated to transforming ideas into reality. Our mission is to empower businesses and individuals through cutting-edge technology and exceptional service.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Join Our Team</button>
            <button className="btn-secondary">Our Story</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={aboutImage} alt="About Us" />
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-number">10+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">500+</div>
          <div className="stat-label">Company Branches</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">70+</div>
          <div className="stat-label">International Countries</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">98%</div>
          <div className="stat-label">Client Satisfaction</div>
        </div>
      </div>

      {/* World Map Section */}
      <div className="world-map-section">
        <div className="section-header">
          <h2 className="section-title" style={{ fontSize: "3rem", color: "#000000" }}>Global Reach</h2>
          <p className="section-description">
            Connecting with clients and partners across the world, delivering innovative solutions that transcend borders.
          </p>
        </div>
        <WorldMap 
          dots={mapConnections}
          lineColor="#667eea"
        />
      </div>

      {/* Principles Section */}
      <div className="principles-section">
        <div className="principles-header">
          <h2 className="principles-title">What Drives Us Forward</h2>
          <p className="principles-description">
            These fundamental principles guide every decision we make and shape the culture we've built.
          </p>
        </div>
        <div className="principles-grid">
          <div className="principle-card">
            <div className="principle-icon">🎯</div>
            <h3 className="principle-title">Mission Driven</h3>
            <p className="principle-text">
              We're committed to solving real problems and making a meaningful impact in our industry.
            </p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">💡</div>
            <h3 className="principle-title">Innovation First</h3>
            <p className="principle-text">
              We embrace cutting-edge technology and creative solutions to stay ahead of the curve.
            </p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">👥</div>
            <h3 className="principle-title">People Focused</h3>
            <p className="principle-text">
              Our team and customers are at the heart of everything we do.
            </p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">🏆</div>
            <h3 className="principle-title">Excellence</h3>
            <p className="principle-text">
              We maintain the highest standards in our products, services, and partnerships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
