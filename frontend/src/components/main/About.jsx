import React from 'react'

const About = () => {
  return (
    <div id="about" className="about-us section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 align-self-center">
          <div className="section-heading">
            <h4>About <em>What We Do</em> &amp; Who We Are</h4>
            <img src="heading-line-dec.png" alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eismod tempor incididunt ut labore et dolore magna.</p>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Maintance Problems</a></h4>
                <p>Lorem Ipsum Text</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">24/7 Support &amp; Help</a></h4>
                <p>Lorem Ipsum Text</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Fixing Issues About</a></h4>
                <p>Lorem Ipsum Text</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Co. Development</a></h4>
                <p>Lorem Ipsum Text</p>
              </div>
            </div>
            <div className="col-lg-12">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eismod tempor idunte ut labore et dolore adipiscing  magna.</p>
              <div className="gradient-button">
                <a href="#">Start 14-Day Free Trial</a>
              </div>
              <span>*No Credit Card Required</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="right-image">
            <img src="about-right-dec.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default About