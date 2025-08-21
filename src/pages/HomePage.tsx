import { useContext } from "react";
import AuthHomePage from "../components/HomePage/AuthHomePage";
import UnAuthHomePage from "../components/HomePage/UnAuthHomePage";
import { AuthContext } from "../App"; 
import TextType from "../../TextAnimations/TextType/TextType";
import "./HomePage.css"; 

function HomePage() {
  const { isAuth } = useContext(AuthContext); 

  return (
    <div className="homepage-container">
      {/* Background Video */}
      <video autoPlay muted loop className="background-video">
        <source src="/src/Videos/Background_Design.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Animated Text */}
      <div className="text-type-container">
        <TextType 
          text={[
            "Welcome to our TekaroQ",
            "Future of Technology", 
            "Assigned by the nation"
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={false}
        />
        <p className="paragraph-text">
          At TekaroQ, we bridge the gap between cutting-edge technology and real-world solutions. 
          Whether you're seeking transformative software, futuristic insights, or tools to empower your journey, 
          TekaroQ is your trusted partner in navigating the digital frontier. Explore, create, and thrive with us.
        </p>
        <button className="Get-Started">Get Started</button>
      </div>

          {/* Statistics Section */}
      <h1 style={{ fontSize: "3rem", paddingTop: "2rem", marginTop: "7rem" }} className="stats-title">Our Achievements</h1>
      <section className="stats-section">
 
        <div className="stat-item">
          <h3 className="stat-number">10+</h3>
          <p className="stat-label">Years Experience</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">2500+</h3>
          <p className="stat-label">Projects Completed</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">50+</h3>
          <p className="stat-label">Team Members</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">98%</h3>
          <p className="stat-label">Client Satisfaction</p>
        </div>
      </section>

      {/* Principles Section */}
      <div style={{ marginTop: " 2rem" }} className="principles-section1">
        <div className="principles-header1">
          <h2 className="principles-title1">What Drives Us Forward</h2>
          <p className="principles-description1">
            These fundamental principles guide every decision we make and shape the culture we've built.
          </p>
        </div>

        <div className="principles-grid1">
          <div className="principle-card1">
            <div className="principle-icon1"><img src="https://img.icons8.com/?size=100&id=rZg8l5ZYxpnn&format=png&color=000000" alt="" /></div>
            <h3 className="principle-title1">Infrastructure</h3>
            <p className="principle-text1">
              We're committed to solving real problems and making a meaningful impact in our industry.
            </p>
          </div>

          <div className="principle-card1">
            <div className="principle-icon1"><img src="https://img.icons8.com/?size=100&id=2985&format=png&color=000000" alt="" /></div>
            <h3 className="principle-title1">Security</h3>
            <p className="principle-text1">
              We embrace cutting-edge technology and creative solutions to stay ahead of the curve.
            </p>
          </div>

          <div className="principle-card1">
            <div className="principle-icon1"><img src="https://img.icons8.com/?size=100&id=6690&format=png&color=000000" alt="" /></div>
            <h3 className="principle-title1">Performance</h3>
            <p className="principle-text1">
              Our team and customers are at the heart of everything we do.
            </p>
          </div>
        </div>
      </div>

      

      {/* Auth condition (if needed) */}
      {/* {isAuth ? <AuthHomePage /> : <UnAuthHomePage />} */}
    </div>
  );
}

export default HomePage;
