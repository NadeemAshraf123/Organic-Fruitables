import { useState, useEffect, useRef } from "react";
import client from "../../assets/client/client.jpg";
import '../globalstyle/GlobelStyle.css';


const testimonials = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  imageUrl: `${client}`,
  text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  name: `Client ${i + 1}`,
  profession: i % 2 === 0 ? "Designer" : "Developer",
  rating: (i % 5) + 1,
}));

const TestimonialCarousel = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    if (cardRef.current && scrollRef.current) {
      const first = cardRef.current;
      const second = first.nextElementSibling as HTMLElement | null;

      if (second) {
        setCardWidth(second.offsetLeft - first.offsetLeft);
      } else {
        setCardWidth(first.offsetWidth);
      }
    }
  }, []);

  
  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => {
      handleScroll("next");
    }, 3000);
    return () => clearInterval(interval);
  }, [cardWidth, isMobile]);

 
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);


  const handleScroll = (direction: "next" | "prev") => {
    if (!scrollRef.current || !cardWidth) return;
    const container = scrollRef.current;

    if (direction === "next") {
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-12 px-4 mb-20">
      <div className="max-w-[1320px] mx-auto w-full">
      
        <div className="mb-10">
          <div className="text-center">
            <h2 className="text-2xl text-[#81C408]">Our Testimonial</h2>
            <p className="text-3xl md:text-[3rem] font-bold text-[#45595B] mb-2">
              Our Client Saying!
            </p>
          </div>

          
          
            <div className="w-full max-w-[1320px] flex justify-end gap-6">
              <button
                onClick={() => handleScroll("prev")}
                className="px-5 bg-transparent border border-[#FFB524] hover:bg-[#FFB524] hover:text-white text-[#81C408] rounded-full transition"
              >
                ←
              </button>
              <button
                onClick={() => handleScroll("next")}
                className="px-5 bg-transparent border border-[#FFB524] hover:bg-[#FFB524] hover:text-white text-[#81C408] rounded-full transition"
              >
                →
              </button>
            </div>
        
        </div>

        
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll no-scrollbar scroll-smooth gap-6"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              ref={i === 0 ? cardRef : null}
              className="flex-shrink-0 w-full sm:w-[calc(100%-1.5rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(50%-0.75rem)]"
            >
              <div className="p-6 rounded-lg shadow-md h-full bg-[#F4F6F8]">
                <p className="text-gray-600 mb-6">{t.text}</p>
                <hr className="border-t border-[#FFB524] mb-4" />

                <div className="flex items-center gap-4 mt-10">
                  <img
                    src={t.imageUrl}
                    alt={t.name}
                    className="w-16 h-16 rounded-md object-cover border-2 border-gray-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-xl text-gray-800">
                      {t.name}
                    </h4>
                    <p className="text-md text-gray-500">{t.profession}</p>

                 
                    <div className="text-yellow-400 text-xl mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < t.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
