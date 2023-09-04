import "../../assets/styles/components/Footer.scss";
import twitterLogo from "../../assets/images/socialmedia/twitter.svg";
import facebookLogo from "../../assets/images/socialmedia/facebook.svg";
import instagramLogo from "../../assets/images/socialmedia/instagram.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-socials row">
        <img className="col-3-md" src={facebookLogo} alt="logo twitter" />
        <img className="col-3-md" src={twitterLogo} alt="logo twitter" />
        <img className="col-3-md" src={instagramLogo} alt="logo twitter" />
      </div>
    </footer>
  );
};

export default Footer;
