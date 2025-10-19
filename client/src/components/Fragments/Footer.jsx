import React from 'react';

const Footer = () => {
    return(
        <>
            <div className="bg-white">
                <section className="w-[200px] h-[100px] py-6 flex flex-row items-center mx-auto">
                    <img className="w-[40px] h-[25px] " src="../../../images/logo-footer.png" alt="Logo" />
                    <p className="text-blue-900 font-extrabold text-[20px] pt-1 ml-2">Mentor <span className="text-blue-400">Kita</span></p>
                </section>
                <section className="w-[225px] h-[60px] flex flex-row mx-auto lg:w-[250px] lg:h-[71px] lg:pl-[20px] lg:mt-[40px]">
                    <p className="font-bold pt-[2px] lg:text-[20px] lg:leading-[30px]">Reach us</p>
                    <img className="w-[30px] h-[30px] mx-2 lg:w-[33px] lg:h-[33px]" src="https://cdn2.iconfinder.com/data/icons/cv-curriculum-vitae/100/set_cv3ok-07-512.png" alt="Instagram" />
                    <img className="w-[30px] h-[30px] mx-2 lg:w-[33px] lg:h-[33px]" src="https://cdn.icon-icons.com/icons2/3261/PNG/512/twitter_logo_icon_206654.png" alt="X" />
                    <img className="w-[30px] h-[30px] mx-2 lg:w-[33px] lg:h-[33px]" src="https://cdn3.iconfinder.com/data/icons/brands-applications/512/Line_A-512.png" alt="Line" />
                </section>
            </div>
            <div className="bg-blue-900 h-[45px] lg:h-[88px]">
                <p className="text-white text-[12px] text-center py-3 lg:text-[20px] lg:pt-[25px]">&copy; 2024 Developed by Mentor Team</p>
            </div>
        </>
    )
};
   
export default Footer;
