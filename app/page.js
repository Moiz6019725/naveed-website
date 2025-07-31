import CarListWithFilters from "./components/CarListWithFilters";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function UserHomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-2xl max-[980px]:text-lg font-bold mb-6">Available Cars</h1>
        <CarListWithFilters />
      </main>
      <Footer />
    </>
  );
}
