"use client"

import React from 'react';
import FileLottie from './LottieComponent';

function DashboardAnimation({ animationData }:DashboardAnimationProps) {
  return (
    <div className="my-3 mx-4 float-left">
      <FileLottie animationData={animationData} />
    </div>
  );
};

export default DashboardAnimation;
