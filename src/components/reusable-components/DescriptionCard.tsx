import Image from 'next/image';

const DescriptionCard: React.FC<DescriptionCardProps> = ({ title, description, buttonText, imageSrc, alt, href, highlightedWord }) => {
  
  const highlightedTitle = title.split(' ').map((word, index) => (
    word === highlightedWord ? <span key={index} className='inline text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 pr-1'>{word} </span> : `${word} `
  ));

  return (
    <div className="w-4/6 h-6/6 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <a href={href}>
        <h5 className="mb-2 text-2xl font-glegoo font-bold tracking-tight text-gray-900">{highlightedTitle}</h5>
      </a>
      <p className="mb-3 text-sm text-gray-700">{description}</p>
      <div className='flex justify-end p-4'>
        <a href={href} className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-custom-blue rounded-lg hover:bg-button-blue focus:outline-none custom dark:hover:bg-button-blue">
          {buttonText}
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
      <div className='flex justify-center overflow-hidden'>
        <Image 
          src={imageSrc} 
          alt={alt} 
          width={900} 
          height={700} 
          quality={50}
          className="rounded-lg shadow-lg" 
        />
      </div>
    </div>
  );
};

export default DescriptionCard;
