import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p className="text-center text-sm leading-none">&copy; {new Date().getFullYear()} Spectrum. All rights reserved.</p>
    </footer>
  );
};

export default Footer;