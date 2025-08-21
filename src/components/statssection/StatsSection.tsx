import React from 'react';
import { FaUsers, FaStar, FaCertificate, FaBox } from 'react-icons/fa';


interface StatCardProps {
    icon: React.ReactNode;
    heading: string;
    value: string | number;
    showPercent: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, heading, value, showPercent }) => (

    <div className=' w-[200px] sm:h-[294px] sm:w-[282px] lg:w-[288px] lg:h-[261px] mx-auto    bg-[#FFFFFF] rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition'>
        
        <div className='text-[#FFB524] text-8xl mb-4'>{icon}</div>
        <h3 className='text-[#81C408] font-bold text-[24px] mb-1'>{heading}</h3>
        <p className='text-gray-800 text-[40px] font-lightbold font-serif'>
            {value}
            {showPercent && <span className='ml-1'>%</span>}
            </p>
    </div>
);

const StatsSection: React.FC = () => {
    const stats = [ 
        {icon: <FaUsers />, heading: 'Satisfied Customers', value: 1963 },
        {icon:  <FaUsers /> ,heading: 'Quality of Service',  value: 99 },
        {icon:  <FaUsers/> ,  heading:   'Quality Certificates', value: 33, showPercent: true  },
        {icon:  <FaUsers  /> ,  heading: 'Available Products',   value: 789 },
    ];

    return (
        <section className='w-full bg-[#ffffff] mb-20 mt-30 ' >

            <div className='w-full max-w-[1320px] mx-auto md:w-full lg:w-full bg-[#F4F6F8] p-12   '>


            <div className='  grid grid-cols-1 justify-center mt-4 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>
            </div>

        </section>
    )
}

export default StatsSection;
