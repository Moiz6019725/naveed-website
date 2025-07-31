// app/admin/cars/[id]/page.jsx
import connectToDatabase from "@/lib/dbConnect";
import { Car } from "@/models/Car";
import CarDetailsAdmin from "@/app/components/CarDetailsAdmin";

const Page = async ({ params }) => {
  await connectToDatabase("cars");
  const { id } = await params;
  const car = await Car.findOne({ _id: id });

  return (
    <div className="p-2">
      <CarDetailsAdmin car={JSON.stringify(car)} />
    </div>
  );
};

export default Page;
