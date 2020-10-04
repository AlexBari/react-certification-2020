import React from 'react';
import { VideoPageProvider } from '../providers/VideoPageProvider';
import HomeComponent from '../components/home/homeComponent';

const HomePage = () => {
  return (
    <VideoPageProvider>
      <HomeComponent />
    </VideoPageProvider>
  );
};

export default HomePage;
