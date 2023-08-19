import "./EditWarehouse.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import arrowBack from "../../assets/images/arrow_back-24px.svg";
import axios from "axios";

function EditWarehouse() {
  const { idFromParams } = useParams();

  const [warehouse_name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contact_name, setContact] = useState("");
  const [contact_position, setPosition] = useState("");
  const [contact_phone, setPhoneNumber] = useState("");
  const [contact_email, setEmail] = useState("");

  const [errors, setErrors] = useState({});

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regexTel = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/;

  const hasError = (field) => {
    return errors[field] !== undefined;
  };

  const isFormValid = () => {
    const newErrors = {};

    //Check if the fields are all filled (non-empty)
    if (!warehouse_name) newErrors.warehouse_name = "This field is required";
    if (!address) newErrors.address = "This field is required";
    if (!city) newErrors.city = "This field is required";
    if (!country) newErrors.country = "This field is required";
    if (!contact_name) newErrors.contact_name = "This field is required";
    if (!contact_position)
      newErrors.contact_position = "This field is required";
    if (!contact_phone) newErrors.contact_phone = "This field is required";
    if (!contact_email) newErrors.contact_email = "This field is required";
    //  For Phone Number and Email fields validate correct phone number and email. Front-End validation needs to be custom and cannot use default HTML5 form validation.
    if (!regexTel.test(contact_phone))
      newErrors.contact_phone = "Telephone format is invalid";
    if (!regexEmail.test(contact_email))
      newErrors.contact_email = "Email format is invalid";

    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log(e);
      // Perform your data submission - sending to database
      console.log("Data to submit:", {
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      });
      const warehouseData = {
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      };
      //
      axios
        .put(
          `http://localhost:8080/api/warehouses/` + idFromParams,
          warehouseData
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      alert("Updated warehouse details successfully");
    } else {
      alert(
        "Failed to update the warehouse details, there was at least one error in the form."
      );
    }
  };

  return (
    <>
      <main className="edit-warehouse">
        <section className="edit-warehouse__page">
          <div className="edit-warehouse__header">
            <img
              className="edit-warehouse__img"
              src={arrowBack}
              alt="Arrow back"
            />
            <h1 className="edit-warehouse__title">Edit Warehouse</h1>
          </div>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="edit-warehouse__form"
          >
            <div className="edit-warehouse__details">
              <h2 className="edit-warehouse__subheading">Warehouse Details</h2>
              <label htmlFor="name" className="edit-warehouse__label">
                Warehouse Name
                <input
                  type="text"
                  name="warehouse_name"
                  id="name"
                  placeholder="Washington"
                  value={warehouse_name}
                  onChange={(e) => setName(e.target.value)}
                  className={`edit-warehouse__input ${
                    hasError("warehouse_name")
                      ? "edit-warehouse__input--error"
                      : ""
                  }`}
                />
                {hasError("warehouse_name") ? (
                  <span className="edit-warehouse__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="address" className="edit-warehouse__label">
                Street Address
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="33 Pearl Street SW"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`edit-warehouse__input ${
                    hasError("address") ? "edit-warehouse__input--error" : ""
                  }`}
                />
                {hasError("address") ? (
                  <span className="edit-warehouse__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="city" className="edit-warehouse__label">
                City
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Washington"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`edit-warehouse__input ${
                    hasError("city") ? "edit-warehouse__input--error" : ""
                  }`}
                />
                {hasError("city") ? (
                  <span className="edit-warehouse__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="country" className="edit-warehouse__label">
                Country
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="USA"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`edit-warehouse__input ${
                    hasError("country") ? "edit-warehouse__input--error" : ""
                  }`}
                />
                {hasError("country") ? (
                  <span className="edit-warehouse__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>
            </div>
            <div className="edit-warehouse__details edit-warehouse__details--border ">
              <h2 className="edit-warehouse__subheading">Contact Details</h2>
              <label htmlFor="contact" className="edit-warehouse__label">
                Contact Name
                <input
                  type="text"
                  name="contact_name"
                  id="contact"
                  value={contact_name}
                  placeholder="Graeme Lyon"
                  onChange={(e) => setContact(e.target.value)}
                  className={`edit-warehouse__input ${
                    hasError("contact_name")
                      ? "edit-warehouse__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_name") ? (
                  <span className="edit-warehouse__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="position" className="edit-warehouse__label">
                Position
                <input
                  type="text"
                  name="contact_position"
                  id="position"
                  placeholder="Warehouse Manager"
                  value={contact_position}
                  onChange={(e) => setPosition(e.target.value)}
                  className={`edit-warehouse__input ${
                    hasError("contact_position")
                      ? "edit-warehouse__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_position") ? (
                  <span className="edit-warehouse__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="contact_phone" className="edit-warehouse__label">
                Phone Number
                <input
                  type="tel"
                  name="contact_phone"
                  id="contact_phone"
                  value={contact_phone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (647) 504-0911"
                  className={`edit-warehouse__input ${
                    hasError("contact_phone")
                      ? "edit-warehouse__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_phone") ? (
                  <span className="edit-warehouse__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="contact_email" className="edit-warehouse__label">
                Email
                <input
                  type="email"
                  name="contact_email"
                  id="contact_email"
                  value={contact_email}
                  placeholder="glyon@instock.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className={`edit-warehouse__input ${
                    hasError("contact_email")
                      ? "edit-warehouse__input--error"
                      : ""
                  }`}
                />
                {hasError("contact_email") ? (
                  <span className="edit-warehouse__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>
            </div>
          </form>
          <div className="edit-warehouse__buttons">
            <button className="edit-warehouse__button-cancel">Cancel</button>
            <button
              className="edit-warehouse__button-save"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default EditWarehouse;
