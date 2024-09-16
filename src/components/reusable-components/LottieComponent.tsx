import React from 'react';
import Lottie from 'react-lottie';

function FileLottie ({animationData}:LottieProps){
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
      <Lottie options={defaultOptions} height={80} width={80} />
  );
};

export default FileLottie;

