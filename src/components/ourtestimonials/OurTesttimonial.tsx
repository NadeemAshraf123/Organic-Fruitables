import { useState } from 'react';
import client from '../../assets/client/client.jpg';


// SVG Icons
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

interface Testimonial {
  id: number;
  imageUrl: string;
  text: string;
  name: string;
  profession: string;
  rating: number;
}

const TestimonialCarousel = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      imageUrl: `${client}`,
      text: 'Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      name: 'Client One',
      profession: 'Designer',
      rating: 5
    },
    {
      id: 2,
      imageUrl: `${client}`,
      text: 'Lorem Ipsum is simply dummy text of the printing Ipsum has been the industrys standard dummy text ever since the 1500s',
      name: 'Client Two',
      profession: 'Developer',
      rating: 4
    },
    {
      id: 3,
      imageUrl: `${client}`,
      text:  'Lorem Ipsum is simply dummy text of the printing Ipsum has been the industrys standard dummy text ever since the 1500s.',
      name: 'Client Three',
      profession: 'Manager',
      rating: 5
    },
    {
      id: 4,
      imageUrl: `${client}`,
      text: 'Lorem Ipsum is simply dummy text of the printing Ipsum has been the industrys standard dummy text ever since the 1500s.',
      name: 'Client Four',
      profession: 'CEO',
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Get current pair of testimonials
  const visibleTestimonials = () => {
    if (currentIndex + 2 <= testimonials.length) {
      return testimonials.slice(currentIndex, currentIndex + 2);
    }
    // Handle wrap-around case
    return [
      ...testimonials.slice(currentIndex),
      ...testimonials.slice(0, 2 - (testimonials.length - currentIndex))
    ];
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 2) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 2 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
      {/* Header with Top-Right Arrows */}
      {/* <div className="flex justify-between items-center mb-10"> */}
      <div className=' mb-10'>
        <div  className='text-center'>
          <h2 className="text-2xl text-[#81C408]">Our Testimonial</h2>
          <p className="text-[3rem] font-bold text-[#45595B] mb-2">Our Client Saying!</p>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex justify-end gap-3">
          <button 
            onClick={prevTestimonial}
            className="bg-white p-2 rounded-full border border-[#FFB524] shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={nextTestimonial}
            className="bg-white p-2 rounded-full border border-[#FFB524] shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Two Cards Container */}
      <div className="flex justify-center  gap-6">
        {visibleTestimonials().map((testimonial) => (
          <div key={testimonial.id} className="w-full max-w-lg flex-shrink-0">
            <div className="p-6 rounded-lg shadow-md h-full  bg-[#F4F6F8]">
              <p className="text-gray-600 mb-6">{testimonial.text}</p>
              <hr className="border-t border-[#FFB524] mb-4" />
              <div className="flex items-center gap-4 mt-10">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-25 h-25 rounded-md object-cover border-2 border-gray-200"
                />
                <div className="flex-1 items-start mt-2">
                  <div>
                    <h4 className="font-lighterbold text-2xl text-gray-800">{testimonial.name}</h4>
                    <p className="text-md text-gray-500">{testimonial.profession}</p>
                  </div>
                  <div className="text-yellow-400 text-xl mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < testimonial.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

   
    </section>
  );
};

export default TestimonialCarousel;