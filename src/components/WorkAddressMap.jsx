import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const WorkAddressMap = ({ workAddress }) => {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        const getCoordinates = async (address) => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`);
                const data = await response.json();

                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    setPosition([lat, lon]);
                } else {
                    console.error("No results found for the address.");
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        };

        if (workAddress) {
            getCoordinates(workAddress);
        }
    }, [workAddress]);

    return (
        <div className="mt-10">
            {position && (
                <MapContainer center={position} zoom={19} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>
                            {workAddress}
                        </Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
};

export default WorkAddressMap;
