// ExploreHomeCard.js
import React from 'react';

const ExploreHomeCard = ({ home }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '15px', width: '300px' }}>
      <h2>{home.name}</h2>
      <p>Location: {home.location}</p>
      <p>Accommodation Type: {home.accommodationType}</p>
      <p>Bedrooms: {home.bedrooms}, Bathrooms: {home.bathrooms}</p>
      <p>Rent Amount: ${home.rentAmount}</p>
      <p>Utilities Included: {home.utilitiesIncluded ? 'Yes' : 'No'}</p>
      <p>Move In Date: {new Date(home.moveInDate).toLocaleDateString()}</p>
      {/* Optionally display images if any */}
      {home.images && home.images.length > 0 && (
        <div>
          {home.images.map((image, index) => (
            <img key={index} src={image} alt={`Home ${home.name}`} style={{ maxWidth: '100px', marginRight: '10px' }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreHomeCard;
