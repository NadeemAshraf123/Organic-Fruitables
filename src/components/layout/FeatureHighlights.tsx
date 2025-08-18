import React from 'react';
import { FaShippingFast, FaShieldAlt, FaExchangeAlt, FaPhoneAlt } from 'react-icons/fa';

interface Feature {
    icon: JSX.Element;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: <FaShippingFast className='text-white text-5xl' />,
        title: 'Free Shipping',
        description: 'Free on order over $300.',
    },
    {
        icon: <FaShieldAlt className="text-white text-5xl" />,
        title: 'Security Payment',
        description: '100% security payment.',
    },
    {
    icon: <FaExchangeAlt className="text-white text-5xl" />,
    title: '30 Day Return',
    description: '30 day money guarantee.',
  },
  {
    icon: <FaPhoneAlt className="text-white text-5xl" />,
    title: '24/7 Support',
    description: 'Support every time fast.',
  },
]

const FeatureHighlights: React.FC = () => {
    return (

        <section className='bg-[yellow] py-16 px-6 mt-20'>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                {features.map((feature, index) => (
                    <div 
                        key={index}
                        className= 'bg-gray-100 rounded-xl shadow-lg p-8 flex flex-col items-center text-center min-h-[280px]'
                        >
                         <div className='bg-yellow-400 rounded-full w-27 h-27 flex items-center justify-center mb-6'>
                            {feature.icon}
                            </div>   
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>
                                {feature.title}
                            </h3>
                            <p className='text-base text-gray-600'>{feature.description}</p>
                            </div>
                        ))}
                    </div>
            </section>
    );
};

export default FeatureHighlights;


