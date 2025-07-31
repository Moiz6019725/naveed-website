// app/admin/cars/[id]/page.jsx
import connectToDatabase from "@/lib/dbConnect";
import { Car } from "@/models/Car";
import EditCarClient from "@/app/components/EditCarClient";

const Page = async ({ params }) => {
  await connectToDatabase("cars");
  const { editId } = await params;
  const car = await Car.findOne({ _id: editId });
  

  return (
      <EditCarClient car={JSON.stringify(car)} />
  );
};

export default Page;
