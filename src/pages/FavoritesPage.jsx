import React, { } from 'react';
import { VideoPageProvider } from '../providers/VideoPageProvider';
import FavoritesComponent from '../components/favorite/FavoritesComponent';

const FavoritesPage = (props) => {
  return (
    <VideoPageProvider>
      <FavoritesComponent />
    </VideoPageProvider>
  );
};

export default FavoritesPage;
