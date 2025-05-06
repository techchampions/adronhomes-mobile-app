import NoPropertyFound from "./NoPropertyFound";
import PropertyCard from "./PropertyCard";

export default function PropertyList({ properties }) {
  //   const address = `${properties[0].street_address}, ${properties[0].lga}, ${properties[0].state} ${properties[0].country}`;

  return (
    <>
      {properties.length === 0 ? (
        <NoPropertyFound />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 justify-center">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              image={property.display_image}
              title={property.name}
              price={property.price}
              streetAddress={property.street_address}
              state={property.state}
              lga={property.lga}
              country={property.country}
              //   location={address}
              squareFeet={property.size}
              hasLights={property.hasLights}
              hasGym={property.hasGym}
              isLand={property.isLand}
            />
          ))}
        </div>
      )}
    </>
  );
}
