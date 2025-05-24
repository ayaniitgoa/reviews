import React, { useEffect, useState } from "react";
import styles from "./LocationHomePage.module.css";
import { useAuthStore } from "../../store/authStore";
import { findNearestCity } from "../../utils/geoUtils.jsx";
import { MapPin, ChevronDown } from "lucide-react"; // Added ChevronDown
import { getLocations } from "../../providers/LocationProvider.jsx";
import LocationChangeModal from "../LocationChangeModal/LocationChangeModal";
import ReviewsBrowser from "../ReviewsBrowser/ReviewsBrowser";

function LocationHomePage() {
  const [allCities, setAllCities] = useState(null);
  const { location, setLocation } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          setLocation({
            locationid: closest.locationid,
            city: closest.city,
            state: closest.state,
          });
        });
      } else {
        throw new Error("Geolocation is not supported by your browser");
      }
    } catch (err) {
      console.error("Error getting location:", err);
    }
  };

  useEffect(() => {
    getLocation();
    console.log("location with id", location);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.locationSelector} onClick={openModal}>
        <div className={styles.locationPin}>
          <MapPin size={18} className={styles.pinIcon} />
        </div>
        <div className={styles.locationText}>
          {location?.city}, {location?.state}
        </div>
        <ChevronDown size={16} className={styles.chevronIcon} />
      </div>

      {isModalOpen && allCities && (
        <LocationChangeModal
          allCities={allCities}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}

      <ReviewsBrowser />
    </div>
  );
}

export default LocationHomePage;
