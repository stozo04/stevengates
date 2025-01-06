function MapEmbed() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const placeId = "ChIJS5dFe_cZTIYRj2dH9qSb7Lk"; // Your place ID
    const mapUrl = `https://www.google.com/maps/embed/v1/place?q=place_id:${placeId}&key=${apiKey}`;
  
    return (
      <iframe
        src={mapUrl}
        loading="lazy"
        className="w-100 h-400 border-0"
        title="Google Maps Embed"
      ></iframe>
    );
  }
  
  export default MapEmbed;
  