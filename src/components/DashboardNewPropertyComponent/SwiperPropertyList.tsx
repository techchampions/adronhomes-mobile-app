import SwiperPropertyCard from "./SwiperPropertyCard";

export default function SwiperPropertyList({ properties }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-7 gap-y-12">
      {properties.map((property) => (
        <SwiperPropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
