import React from 'react';

const About = () => {
  const quotes = [
    "In the world of words, we create a space for your thoughts.",
    "Empowering voices through the art of blogging.",
    "Connecting minds, one post at a time.",
    "Inspiring creativity, fostering community.",
    "Your stories, our platform, a shared journey.",
  ];

  return (
    <div className="aboutContainer">
      <div className="about">
        <h1>About Us</h1>
      </div>
      <div className="aboutDetails">
        <p>
          Welcome to NextBlog, a platform dedicated to sharing stories, thoughts, and ideas.
          We believe in the power of words to inspire, connect, and empower.
        </p>
        <p>
          At NextBlog, we provide a space for both seasoned writers and aspiring bloggers
          to express themselves, engage with a community, and embark on a journey of creativity.
        </p>
        <p>
          Our mission is to foster a supportive environment where diverse voices are celebrated,
          and each story contributes to the tapestry of shared experiences.
        </p>
      </div>
      <div className="aboutQuotes">
        <h2>Discover the Power of Words</h2>
        <div className="quoteContainer">
          {quotes.map((quote, index) => (
            <p key={index}>"{quote}"</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
