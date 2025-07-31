// app/admin/cars/[id]/page.jsx
import connectToDatabase from "@/lib/dbConnect";
import { Car } from "@/models/Car";
import CarDetailsClient from "@/app/components/CarDetailsClient";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const Page = async ({ params }) => {
  await connectToDatabase("cars");
  const { id } = await params;
  const car = await Car.findOne({ _id: id });

  return (
    <div>
      <Navbar/>
      <CarDetailsClient car={JSON.stringify(car)} />
      <Footer/>
    </div>
  );
};

export default Page;
