import React from "react";

const Post = ({ title, body }) => {
  console.log("first");
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-5">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-700">{body}</p>
    </div>
  );
};

export async function getStaticPaths() {
  const data = await getData();
  const paths = data.map((item) => {
    return {
      params: {
        slug: `${item.id}`,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(ctx) {
  const data = await getData();
  const item = data.find((el) => el.id === +ctx.params.slug);

  if (!item) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...item,
    },
    revalidate: 60,
  };
}

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data;
}

export default Post;
