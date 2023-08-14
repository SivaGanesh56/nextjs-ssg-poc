import React from "react";
import Image from "next/image";

const index = () => {
  return (
    <div>
      <h3>Home Page</h3>
      <Image
        src="https://images.ctfassets.net/ukazlt65o6hl/6cWIgfzuITiAzJDKPVzDe7/4e9d3d639759c66be5deb4b0d70e88ba/Group_1000003569.jpg"
        alt="image"
        width={500}
        height={500}
        loader={({ src, width, quality }) => {
          return src + "?w=" + width;
        }}
        placeholder="blur"
        blurDataURL="https://images.ctfassets.net/ukazlt65o6hl/4W7L7kJFo1uZV9LytxpGpS/54f82f4f2d23544834da69e56a6c7279/social_adv_lp_banner.png"
      />
    </div>
  );
};

export default index;
