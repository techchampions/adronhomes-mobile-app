import PropertyCardProgress from "./PropertyCardProgress";

interface Property {
  id: number;
  imageUrl: string;
  title: string;
  location: string;
  raisedAmount: number;
  targetAmount: number;
}

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="w-full grid grid-cols-2 justify-between items-center gap-4">
      {properties.map((property) => (
        <PropertyCardProgress
          key={property.id}
          imageUrl={property.imageUrl}
          title={property.title}
          location={property.location}
          raisedAmount={property.raisedAmount}
          targetAmount={property.targetAmount}
        />
      ))}
    </div>
  );
};

export default PropertyList;
