import React from 'react';
import { FaUsers, FaStar, FaCertificate, FaBox } from 'react-icons/fa';


interface StatCardProps {
    icon: React.ReactNode;
    heading: string;
    value: string | number;
    showPercent: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, heading, value, showPercent }) => (

    <div className='bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition min-h-[330px] max-w-[230px]'>
        <div className='text-[#FFB524] text-8xl mb-4'>{icon}</div>
        <h3 className='text-[#81C408] font-lightbold text-[34px] mb-1'>{heading}</h3>
        <p className='text-gray-800 text-5xl font-lightbold font-serif'>
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
        <section className='max-w-7xl mx-auto px-4 py-10 bg-[#F4F6F8] mt-20 mb-10 ' >
            <div className='max-w-6xl mx-auto '>


            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>
            </div>

        </section>
    )
}

export default StatsSection;
