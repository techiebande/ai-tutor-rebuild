import React from "react";

const Resources = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-5">
      <div className="w-full py-3 col-span-12 md:col-span-6">
        <iframe
          className="h-[150px] sm:h-[300px] md:h-[489px] w-full"
          src="https://www.youtube.com/embed/K7YBTQDpThA?si=e4fpOfeMXZt_HxOE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full py-3 col-span-12 md:col-span-6">
        <iframe
          className="h-[150px] sm:h-[300px] md:h-[489px] w-full"
          src="https://www.youtube.com/embed/ozxFuyGILak?si=luWePmhd2jIBi19B"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Resources;
