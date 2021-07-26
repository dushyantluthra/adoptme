import Pet from "./Pet";

const Results = (props) => {
  const { pets } = props;
  return (
    <div className="search">
      {!pets.length ? (
        <h2>Loading Pets</h2>
      ) : (
        pets.map((e) => {
          return (
            <Pet
              key={e.id}
              name={e.name}
              animal={e.animal}
              breed={e.breed}
              images={e.images}
              location={`${e.city}, ${e.state}`}
              city={e.city}
              id={e.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
