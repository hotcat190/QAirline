import { useState } from "react";
import React from "react";
import "./SlideShow.css";

function SlideShow() {
  const [ currentSlide, setCurrentSlide ] = useState(1);

  function changeNextSlide() {
    if (currentSlide < document.querySelectorAll(".slide").length) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(1);
    }
  }

  function changetofirstSlide() {
    setCurrentSlide(1);
  }

  function changetosecondSlide() {
    setCurrentSlide(2);
  }

  function changetothirdSlide() {
    setCurrentSlide(3);
  }

  function changePrevSlide() {
    if (currentSlide === 1) {
      setCurrentSlide(document.querySelectorAll(".slide").length);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }

  function changeComment() {
    const personIcons = document.querySelectorAll(".person-icon");
    const comments = document.querySelectorAll(".comment");
    const rating = document.querySelector(".rating-value");
    const name = document.querySelector(".name");
    const job = document.querySelector(".job");

    personIcons.forEach((personIcon) => {
      personIcon.addEventListener("mouseenter", () => {
        const personIconData = personIcon.dataset;
        const commentNumber = personIconData.comment;
        const personName = personIconData.name;
        const personJob = personIconData.job;
        const personRating = personIconData.rating;

        comments.forEach((comment) => {
          if (comment.classList.contains(`comment-${commentNumber}`)) {
            comment.classList.add("active-hover");
          } else {
            comment.classList.remove("active-hover");
          }
        });

        rating.textContent = personRating;
        name.textContent = personName;
        job.textContent = personJob;
      });
    });
  }

  function changeScene() {
    const locations = document.querySelectorAll(".locationn");
    const beautifulPlace = document.querySelector(".beautiful-place");

    locations.forEach((location) => {
      location.addEventListener("mouseenter", () => {
        const locationImage = location.getAttribute("image");
        beautifulPlace.src = locationImage;
      });
    });
  }
  const slidesWrapper = document.querySelector(".slides-wrapper")
  const dots = document.querySelectorAll(".dot");


  if (slidesWrapper) {
    slidesWrapper.style.transform = `translateX(-${currentSlide - 1}00%)`;
    dots.forEach((dot, index) => {
      if (index === currentSlide - 1) {
        dot.classList.add("active-dot");
      } else {
        dot.classList.remove("active-dot");
      }
    });
  }
  



  return (
    <div className="slideshow-container">
      <div className="content">
        <div className="slides-wrapper">
          <div className="slide slide1">
            <div className="testimonial-text">
              <h3>Listen from Our Traveler</h3>

              <div className="comments">
                <p className="comment comment-1 active-hover">
                  <strong>
                    Booking with

                    <span style={{ fontWeight: 700, color: "#e6e1e1" }}> QAirline </span>
                  </strong>
                  was a breeze! Great customer support, easy process, and
                  refundable tickets made it stress-free. Highly recommend!
                </p>
                <p className="comment comment-2">
                  <strong>
                    Traveling with
                    <span style={{ fontWeight: 700, color: "#e6e1e1" }}> QAirline </span>
                  </strong>
                  was smooth and comfortable! Great services and friendly
                  staff. I was impressed with the experience and i love it so much.
                </p>
                <p className="comment comment-3">
                  I had an excellent experience booking tickets on
                  <span style={{ fontWeight: 700, color: "#e6e1e1" }}> QAirline </span>. The process was easy, and the staff was helpful and
                  always willing to assist customers.
                </p>
                <p className="comment comment-4">
                  The flight was fantastic!
                  <span style={{ fontWeight: 700, color: "#e6e1e1" }}> QAirline </span>
                  made everything easy. I really enjoyed my trip and recommend
                  it to everyone, especially my loved one.
                </p>
                <p className="comment comment-5">
                  <span style={{ fontWeight: 700, color: "#e6e1e1" }}> QAirline </span>
                  made my vacation stress-free! Offer excellent services.
                  Additionally, the staff was friendly and helpful. I highly
                  recommend it to everyone.
                </p>
              </div>

              <div className="rating">
                <div className="stars">★★★★★</div>
                <span className="rating-value">4.9/5.0</span>
              </div>
              <p className="name">Ralph Edwards</p>
              <p className="job">Medical Assistant</p>
            </div>

            <div className="world-map">
              <img src="img/map.svg" alt="World Map" className="world" />

              <div className="person-icon person-1" data-comment="1" data-name="Ralph Edwards" data-job="Medical Assistant" data-rating="4.9/5.0" onMouseEnter={changeComment}>
                <img src="img/avatar-12.jpg" alt="Person 1" />
              </div>

              <div className="person-icon person-2" data-comment="2" data-name="Lena Leyer" data-job="Software Engineer" data-rating="4.8/5.0" onMouseEnter={changeComment}>
                <img src="img/avatar-13.jfif" alt="Person 2" />
              </div>

              <div className="person-icon person-3" data-comment="3" data-name="Emily Johnson" data-job="Graphic Designer" data-rating="4.7/5.0" onMouseEnter={changeComment}>
                <img src="img/avatar-7.jpeg" alt="Person 3" />
              </div>

              <div className="person-icon person-4" data-comment="4" data-name="Sophia Brown" data-job="Marketing Specialist" data-rating="4.9/5.0" onMouseEnter={changeComment}>
                <img src="img/avatar-6.jpg" alt="Person 4" />
              </div>

              <div className="person-icon person-5" data-comment="5" data-name="James Williams" data-job="Project Manager" data-rating="5.0/5.0" onMouseEnter={changeComment}>
                <img src="img/avatar-9.jpg" alt="Person 5" />
              </div>
            </div>
          </div>
          <div className="slide slide2">
            <div className="staffs-show">
              <h3>Meet Our Crew</h3>
              <p className="desc">
                We provide the best services with our professional and
                friendly staffs.
              </p>
              <div className="staffs">
                <img src="img/pilot1.jpg" alt="" />
                <img src="img/staff1.jpg" alt="" />
                <img src="img/pilot2.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="slide slide3">
            <div className="testimonial-text">
              <h3>Scenery Views</h3>
              <img src="img/pd_1.jpg" alt="" className="beautiful-place" />
            </div>
            <div className="world-map">
              <img src="img/map.svg" alt="World Map" className="world" />
              <div className="location-1 locationn" image="img/pd_1.jpg" data-text="Paris, France" onMouseEnter={changeScene}>
                <img src="img/location.svg" alt="location" />
              </div>

              <div className="location-2 locationn" image="img/pd_2.jpg" data-text="Rome, Italy" onMouseEnter={changeScene}>
                <img src="img/location.svg" alt="location" />
              </div>

              <div className="location-3 locationn" image="img/pd_3.jpg" data-text="Sydney, Autralia" onMouseEnter={changeScene}>
                <img src="img/location.svg" alt="location" />
              </div>
            </div>
          </div>
        </div>
        <div className="arrow-slide arrow-left" onClick={changePrevSlide}>
          ❮
        </div>
        <div className="arrow-slide arrow-right" onClick={changeNextSlide}>
          ❯
        </div>
        <div className="dot-parent">
          <div className="dots-container">
            <span className="dot active-dot" onClick={changetofirstSlide}></span>
            <span className="dot" onClick={changetosecondSlide}></span>
            <span className="dot" onClick={changetothirdSlide}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlideShow;