import AboutBanner from '@/components/UI/AboutPage/Banner/Banner';
import ContactUs from '@/components/UI/AboutPage/ContactUs/ContactUs';
import MeetTeam from '@/components/UI/AboutPage/MeetTeam/MeetTeam';
import TechnologyStack from '@/components/UI/AboutPage/TechnologyStack/TechnologyStack';
import React from 'react';

const About = () => {
  return (
    <>
      <AboutBanner/>
      <TechnologyStack/>
      <MeetTeam/>
      <ContactUs/>
    </>
  );
};

export default About;