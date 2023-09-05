import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import ServerComponent from "../../components/ServerComponent";
import ClientComponent from "../../components/ClientComponent";

const Page = async ({ params }) => {
  if (params.locale === "ko") notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow m-20">
        <h3>Home Page</h3>
        <ClientComponent />
        <ServerComponent />
      </main>
      <Footer />
    </div>
  );
};

export const dynamicParams = false; // drive through env or maybe inject on demand
// export const revalidate = 10; // only on preview

export default Page;
