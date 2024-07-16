import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Department = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <div>Department</div>
      <Carousel responsive={responsive}>
      <div className="col-lg-3">
            <div className="service-item first-service">
              <div className="icon"></div>
              <h4>App Maintenance</h4>
              <p>
                You are not allowed to redistribute this template ZIP file on
                any other website.
              </p>
              <div className="text-button">
                <a href="#">
                  Read More <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="service-item second-service">
              <div className="icon"></div>
              <h4>Rocket Speed of App</h4>
              <p>
                You are allowed to use the Chain App Dev HTML template. Feel
                free to modify or edit this layout.
              </p>
              <div className="text-button">
                <a href="#">
                  Read More <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="service-item third-service">
              <div className="icon"></div>
              <h4>Multi Workflow Idea</h4>
              <p>
                If this template is beneficial for your work, please support us{" "}
                <a
                  rel="nofollow"
                  href="https://paypal.me/templatemo"
                  target="_blank"
                >
                  a little via PayPal
                </a>
                . Thank you.
              </p>
              <div className="text-button">
                <a href="#">
                  Read More <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="service-item fourth-service">
              <div className="icon"></div>
              <h4>24/7 Help &amp; Support</h4>
              <p>
                Lorem ipsum dolor consectetur adipiscing elit sedder
                williamsburg photo booth quinoa and fashion axe.
              </p>
              <div className="text-button">
                <a href="#">
                  Read More <i className="fa fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
      </Carousel>
    </div>
  );
};

export default Department;
