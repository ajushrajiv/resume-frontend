import React from 'react';
import Link from 'next/link';
import FileLottie from './LottieComponent';

const CardWithAnimation: React.FC<CardWithAnimationProps> = ({ animationData, text, href }) => {
  return (
    <Link href={href}>
    <div className="block max-w-xs max-h-64 p-6 border border-gray-200 rounded-lg shadow ">
      <div className="mb-2 text-3xl drop-shadow-2xl text-purple-500">
        <FileLottie animationData={animationData} />
      </div>
      <p className="font-normal text-custom-blue font-glegoo">{text}</p>
    </div>
    </Link>

  );
};

export default CardWithAnimation;
