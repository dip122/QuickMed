import React from 'react'
import '../../Css/AboutCircles.css'
import CountUp from 'react-countup';

const AboutCircles = () => {
  return (
    <div className = "about-circles">
      <div className = "about-records">Our Records!</div>
      <div className = "circles-section">
        <div className = "circles bg-gray-300">
          <CountUp
            start = {0}
            end = {250}
            duration = {2}
            delay = {0}
          >
            {({ countUpRef }) => (
              <div className = "counter">
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <span className = 'names-circle'>
            Doctors <br />
            count
          </span>
        </div>
        <div className = "circles bg-gray-300">
          <CountUp
            start = {0}
            end = {1000}
            duration = {2}
            delay = {0}
          >
            {({ countUpRef }) => (
              <div className = "counter">
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <span className = 'names-circle'>
            Patient <br />
            count
          </span>
        </div>
        <div className = "circles bg-gray-300">
          <CountUp
            start = {0}
            end = {4000}
            duration = {2}
            delay = {0}
          >
            {({ countUpRef }) => (
              <div className = "counter">
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <span className = 'names-circle'>
            Users <br />
            count
          </span>
        </div>
      </div>
    </div>
  )
}

export default AboutCircles