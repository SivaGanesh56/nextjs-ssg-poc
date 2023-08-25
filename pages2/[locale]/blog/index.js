import React from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { getStaticPaths, makeStaticProps } from "../../../lib/getStatic";

const BlogPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow m-20">
        <h3>Blog Home Page</h3>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps = makeStaticProps(async function callback() {});

export { getStaticPaths };

export default BlogPage;
