import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'; // Import the necessary icons
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import "./About.css"
const About = () => {
    // Define the FontAwesome icons
    const linkedIn = faLinkedin as IconProp;
    const gitHub = faGithub as IconProp;

    return (
        <div className="about-container">
            <section className="about-section">
                <h2>About Dictionary App</h2>
                <p>Welcome to Dictionary App, your comprehensive dictionary app designed to provide you with quick and accurate word definitions.</p>
            </section>

            <section className="developer-section">
                <h3>About the Developer:</h3>
                <p>Hello, I'm Anas, the developer behind Dictionary App. I'm passionate about creating applications and learning about new software development technologies.</p>
            </section>

            <section className="features-section">
                <h3>Key Features:</h3>
                <ul>
                    <li><strong>Word Definitions:</strong> Get clear and concise meanings for any word.</li>
                    <li><strong>Search History:</strong> Easily revisit your past searches.</li>
                    <li><strong>User-Friendly Interface:</strong> Simple and intuitive design for a seamless experience.</li>
                    <li><strong>Links to External Resources:</strong> Explore additional information and resources related to words.</li>
                </ul>
            </section>

            <section className="connect-section">
                <h3>Connect with Me:</h3>
                <ul className="connect-list">
                    <li><FontAwesomeIcon icon={linkedIn} /></li>
                    <li><FontAwesomeIcon icon={gitHub} /></li>
                </ul>
            </section>

            <section className="contact-section">
                <h3>Contact:</h3>
                <p>Have questions, feedback, or suggestions for improvement? Reach out to me at <a className='email' href="mailto:Anassbenomar6@gmail.com">Anassbenomar6@gmail.com</a>.</p>
            </section>

            <section className="thanks-section">
                <p>Thank you for using Dictionary App! Happy exploring!</p>
            </section>
        </div>
    );
};

export default About;
