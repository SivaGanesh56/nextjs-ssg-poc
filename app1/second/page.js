import React from "react";

const page = () => {
  return <div>second page</div>;
};

export async function generateStaticParams() {
  return [{ slug: "1" }, { slug: "2" }, { slug: "3" }];
}

export default page;
