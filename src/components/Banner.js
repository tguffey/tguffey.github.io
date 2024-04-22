import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/TravisProfile.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  // State for the current loop of the array items
  const [loopNum, setLoopNum] = useState(0);
  // State to track whether the text is currently being deleted
  const [isDeleting, setIsDeleting] = useState(false);
  // State to hold the current text to display
  const [text, setText] = useState('');
  // State to hold the current speed of typing/deleting
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  // State to track the index of the current character in text
  const [index, setIndex] = useState(1);
  // Array of strings to rotate through
  const toRotate = [ "Developer", "Engineer", "Game Maker" ];
  // Time to pause after typing each word before deleting it
  const period = 2000;

  useEffect(() => {
    // Creates an interval that runs the tick function every delta milliseconds
    let ticker = setInterval(() => {
      tick();
    }, delta);

    // Clean-up function to clear the interval when component unmounts or updates
    return () => { clearInterval(ticker) };
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    // Speeds up the deletion process
    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    // Set a longer pause and start deleting once the full text is typed
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      // Resets for typing the next word once all text is deleted
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(100); // Initial speed for typing
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi, I'm Travis!`} <br></br> <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "Web Designer", "UI/UX Designer" ]'><span className="wrap">{text}</span></span></h1>
                  <p>Throughout my life I've enjoyed the pursuit of expressing creativity alongside the stimulation of problem solving, 
                    as a child I found this with music theory and videography. During my time in the service I discovered programming, 
                    which has been a perfect fit for me and allowed me to be creative while also fueling my curiosity.</p>
                  <p>Alongside computer science I have a strong desire to work among passionate individuals, I greatly treasure any chance 
                    to meet new people and aspire to be on a team of like minded people who are excited about our work. 
                    My skill set includes C++, C#, Java, Python, Unity, and Godot, full-stack development with Kotlin, NodeJS, SQL databases, 
                    and AWS and Linux server knowledge. I also am a good troubleshooter, combining the knowledge I've had on a flight-line 
                    with software debugging, but most importantly my determination to understand a problem when one arises.</p>
                  <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
