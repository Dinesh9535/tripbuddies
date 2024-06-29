 
import Socials from "../components/Socials";

  
export default function FooterFour() {
  return (
    <footer className="footer -type-1 -light bg-dark-1">
      <div className="footer__main">
        <div className="container">
          <div className="footer__info">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="row y-gap-20 items-center">
                  <div className="col-auto">
                    <i className="icon-headphone text-50 text-white"></i>
                  </div>

                  <div className="col-auto">
                    <div className="text-20 fw-500 text-white text-white">
                      Speak to our expert at
                      <span className="text-white">+91 9739359007</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-auto">
                <div className="footerSocials">
                  <div className="footerSocials__title text-white">
                    Follow Us
                  </div> 
                  <div className="footerSocials__icons text-white">
                    <Socials />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div> 
      <div className="border-white-15-top">
        <div className="container">
          <div className="footer__bottom">
            <div className="row y-gap-5 justify-between items-center">
              <div className="col-auto text-white">
                <div>© Copyright Trip Planner, Machathon-Valtech {new Date().getFullYear()}</div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
