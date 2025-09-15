import React from "react";
import storeImage from "../../assets/storeimages/storeImage.png";

const PromoBanner: React.FC = () => {
  return (
    <>
      <section className="w-full mx-auto bg-[#ffaa00] px-6 py-10">
        
        <div className="flex flex-col md:flex-col lg:flex-row w-full md:max-w-[1320px] md:w-full lg:w-full mx-auto">
            
          <div className=" mx-auto w-[272px] md:w-[90%] flex flex-col text-white md:mt-30 lg:mt-10 ">
          
            <div className="mb-6">
              <h2 className="text-[35px] font-semibold md:text-[64px] md:font-bold leading-tight">
                Fresh Exotic  <span> Fruits </span>
              </h2>
              <h2 className="text-[30px] md:text-[64px] font-lightbold leading-tight text-[#45595B]">
                in Our Store
              </h2>
            </div>

              
            
            <span className = "text-[#45595B] text-[16px] md:text-xl opacity-90 mb-6 leading-relaxed"> 

              The generated Lorem Ipsum is therefore always free from repetition
              injected humour,
              or non-characteristic words etc.
              </span>

            <br />
            
            <button className=" self-start bg-transparent mt-6 md:mt-8 lg:mt-6 hover:bg-[#82C508] hover:text-[#45595B] text-[#45595B] font-semibold px-14 py-4 rounded-full transition duration-300 border-2 border-white">
              BUY
            </button>
          </div>

          <div className="w-[272px] mx-auto md:w-full mt-16 md:mt-20 relative">
            <div className="absolute top-0 left-0 bg-white w-35 h-35 md:w-[140px] md:h-[140px] lg:w-[140px] lg:h-[140px] font-Raleway rounded-full shadow flex flex-row justify-center items-center text-[#45595B] md:left-10 lg:left-14 ">
              <div className="flex items-left gap-1">
                <span className="text-[74px] md:text-[100px] font-bold leading-none">1</span>
              </div>

              <div className="flex flex-col ">
                <div  className="">
                <span className="text-[22px] md:text-[28px] font-semibold font-RaleWay leading-none">
                  50  
                </span>
                <span className=" text-[22px] md:text-[34px] font-semibold font-RaleWay md:mb-5 leading-none"> $   </span>  

                </div>

                <span className="text-[18px] md:text-[20px] font-medium font-Raleway">kg</span>
              </div>
            </div>

            <img
              src={storeImage}
              alt="Basket of fruits"
              className="w-[300px] md:w-[700px] lg:w-[636px] object-contain"
            />
          </div>



        </div>
      </section>
    </>
  );
};

export default PromoBanner;
