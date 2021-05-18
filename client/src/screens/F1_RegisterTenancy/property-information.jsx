// React Components
import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom Components
import Input from "../../components/Input";
import Button from "../../components/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";

// Validation
import { isProperty } from "./validation";

// Constants
import { UPDATE_PROPERTY_INFO } from "./constants";

// Styles imported
import styles from "./register-user.module.scss";

// Multilanguage
import { withNamespaces } from "react-i18next";

// Google Maps Autocomplete
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

const PropertyDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});

  const [rentalAddress, setRentalAddress] = useState("");
  const [rentalCity, setRentalCity] = useState(""); // eslint-disable-line
  const [rentalPostalCode, setRentalPostalCode] = useState(""); // eslint-disable-line

  // Google Maps Address and Zip Code
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);

    const addressComponents = results[0].address_components;

    addressComponents.forEach((component) => {
      if (component.types[0].includes("locality")) {
        tenancy.propertyDetails.rentalCity = component.long_name;
      }

      if (component.types[0].includes("street_number")) {
        tenancy.propertyDetails.streetNumber = component.long_name;
      }

      if (component.types[0].includes("route")) {
        tenancy.propertyDetails.route = component.long_name;
      }

      if (component.types[0].includes("postal_code")) {
        tenancy.propertyDetails.rentalPostalCode = component.long_name;
      }

      const finalAddress = `${tenancy.propertyDetails.route}, ${tenancy.propertyDetails.streetNumber}, ${tenancy.propertyDetails.rentalCity}, ${tenancy.propertyDetails.rentalPostalCode}`;

      setRentalAddress(finalAddress);
      tenancy.propertyDetails.rentalAddress = finalAddress;
    });
  };

  // Handle on change
  const handleProperty = ({ target }) => {
    setTenancy({
      type: UPDATE_PROPERTY_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // Hanlde con next / continue
  const handleContinue = (e) => {
    e.preventDefault();
    const errors = isProperty(tenancy.propertyDetails);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setStep(step + 1);
  };

  return (
    <form onSubmit={handleContinue}>
      <div className={styles.FormIntern}>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            {/* Google maps Autocomplete */}
            <PlacesAutocomplete
              value={rentalAddress}
              onChange={setRentalAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <Input
                    id="googleInput"
                    {...getInputProps()}
                    label={t("F1SC.stepZero.renalAddress")}
                    placeholder={t("F1SC.stepZero.renalAddressPL")}
                    required
                    error={errors.rentalAddress}
                  />
                  <div className={styles.GoogleSuggestionContainer}>
                    {/* display sugestions */}
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map((suggestion, place) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "#24c4c48f"
                          : "#fff",
                        cursor: "pointer",
                      };
                      return (
                        <div
                          className={styles.GoogleSuggestion}
                          {...getSuggestionItemProps(suggestion, {
                            style,
                          })}
                          key={place}
                        >
                          <LocationOnIcon />
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="room"
              value={tenancy.propertyDetails.room}
              label={t("F1SC.stepZero.room")}
              placeholder={t("F1SC.stepZero.roomPL")}
              onChange={(e) => handleProperty(e)}
              error={errors.room}
            />
          </div>
        </div>

        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            <Input
              type="date"
              name="rentStartDate"
              value={tenancy.propertyDetails.rentStartDate}
              label={t("F1SC.stepZero.rentStartDate")}
              onChange={(e) => handleProperty(e)}
              error={errors.rentStartDate}
            />
          </div>
          <div className={styles.FormLeft}>
            <Input
              type="date"
              name="rentEndDate"
              value={tenancy.propertyDetails.rentEndDate}
              label={t("F1SC.stepZero.rentEndDate")}
              onChange={(e) => handleProperty(e)}
              error={errors.rentEndDate}
            />
          </div>
        </div>
        <div className={styles.GroupInputAlone}>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="rentAmount"
              value={tenancy.propertyDetails.rentAmount}
              label={t("F1SC.stepZero.rentAmount")}
              sublabel={t("F1SC.stepZero.rentAmountTwo")}
              placeholder={t("F1SC.stepZero.rentAmountPL")}
              onChange={(e) => handleProperty(e)}
              error={errors.rentAmount}
            />
          </div>
        </div>
      </div>

      <div className={styles.AloneButtonContainer}>
        <Button type="submit">{t("nextStepButton")}</Button>
      </div>
    </form>
  );
};

PropertyDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(PropertyDetails);
