import React, { useEffect, useState } from "react";
import styles from "./LocationHomePage.module.css";
import { useAuthStore } from "../../store/authStore";
import { findNearestCity } from "../../utils/geoUtils.jsx";
import { MapPin } from "lucide-react";
import { getLocations } from "../../providers/LocationProvider.jsx";
import LocationChangeModal from "../LocationChangeModal/LocationChangeModal";
import ReviewsBrowser from "../ReviewsBrowser/ReviewsBrowser";

function LocationHomePage() {
  const [allCities, setAllCities] = useState(null);

  const { location, setLocation } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    console.log("Modal state changed:", isModalOpen);
  }, [isModalOpen]);

  const getLocation = async () => {
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        getLocations().then((res) => {
          const closest = findNearestCity(userLat, userLng, res.data);
          setAllCities(res.data);
          console.log("sfef", allCities);

          setLocation({ city: closest.city, state: closest.state });
        });
      } else {
        throw new Error("Geolocation is not supported by your browser");
      }
    } catch (err) {
      console.error("Error getting location:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div>
      <div className={`${styles.locationBox}`}>
        <MapPin color="#db2a2a" />
        {/* {locationDetails.city} */}
        <span className={styles.locationLink} onClick={openModal}>
          {location?.city}, {location?.state}
        </span>

        {isModalOpen && allCities && (
          <LocationChangeModal
            allCities={allCities}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
      <ReviewsBrowser />
    </div>
  );
}

export default LocationHomePage;
