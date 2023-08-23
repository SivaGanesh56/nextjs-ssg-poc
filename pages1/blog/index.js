import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

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

export default BlogPage;
