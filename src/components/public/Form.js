import React, { useState } from "react";
import Navbar from "../../NavbarPublic";
import "./styles/form.css";
import axios from "axios";
import { Button } from "@mui/material";
import InputText from "../InputText";
import ButtonComponent from "../ButtonComponent";
import cloud from "./../../assets/cloud.png";
import InputSelect from "../InputSelect";
import TermsConsitions from "./TermsConsitions";
import { Input } from "reactstrap";

function Form(props) {
  // Create state variables to hold form data
  const [formData, setFormData] = useState({
    ID: "",
    NAME: "",
    DATE: "",
    DUE: "",
    FEE: "",
    CONTACT_NO: "",
    EMAIL: "",
    STATUS: "",
  });
  const [emailError, setEmailError] = useState("");
  const [terms, setTerms] = useState(false);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate email input
    if (name === "EMAIL") {
      // Regular expression for email validation
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError(""); // Clear the error message if email is valid
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const checkFormCompletion = () => {
    // Check if all required fields are filled to enable the terms section
    if (
      !formData.NAME ||
      !formData.DATE ||
      !formData.DUE ||
      !formData.FEE ||
      !formData.CONTACT_NO ||
      !formData.EMAIL ||
      !formData.STATUS
    ) {
      // Display an alert message to inform the user
      alert("Please fill out all fields");
      return; // Do not proceed with form submission
    } else {
      setTerms(!terms);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (
      !formData.NAME ||
      !formData.DATE ||
      !formData.DUE ||
      !formData.FEE ||
      !formData.CONTACT_NO ||
      !formData.EMAIL ||
      !formData.STATUS
    ) {
      // Display an alert message to inform the user
      alert("Please fill out all fields");
      return; // Do not proceed with form submission
    }

    try {
      const response = await axios.post(
        "https://commission.pythonanywhere.com/api/formtasks/",
        formData
      );
      console.log("Response from Django API:", response.data);

      // Clear the form data after successful submission
      setFormData({
        NAME: "",
        DATE: "",
        DUE: "",
        FEE: "",
        CONTACT_NO: "",
        EMAIL: "",
        STATUS: "",
      });
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
      }
    }

    setTerms(!terms);
  };

  return (
    <div>
      <Navbar />
      {terms ? (
        <div className="sub-form">
          <TermsConsitions
            cancel={() => setTerms(!terms)}
            proceed={handleSubmit}
          ></TermsConsitions>
        </div>
      ) : null}

      <div className="form-container">
        <div className="form-subcontainer">
          <div className="white-container">
            <div className="title-commssion">
              <h1>Commission Form</h1>
            </div>
            <div style={{ flexDirection: "row", display: "flex" }}>
              <InputText
                width={"30vh"}
                marginRight={"5%"}
                label={"NAME"}
                height={"100%"}
                type="text"
                name="NAME"
                value={formData.NAME}
                onChange={handleInputChange}
              ></InputText>
              <InputText
                width={"30vh"}
                height={"100%"}
                label={"DATE TODAY"}
                type="date"
                name="DATE"
                value={formData.DATE}
                onChange={handleInputChange}
              ></InputText>
            </div>
            <div style={{ flexDirection: "row", display: "flex" }}>
              <InputText
                width={"30vh"}
                marginRight={"5%"}
                height={"100%"}
                label={"DUE DATE"}
                type="date"
                name="DUE"
                value={formData.DUE}
                onChange={handleInputChange}
              ></InputText>
              <InputText
                width={"30vh"}
                height={"100%"}
                label={"PAYMENT FEE"}
                type="number"
                name="FEE"
                value={formData.FEE}
                onChange={handleInputChange}
              ></InputText>
            </div>
            <div style={{ flexDirection: "row", display: "flex" }}>
              <InputText
                width={"30vh"}
                marginRight={"5%"}
                height={"100%"}
                label={"CONTACT"}
                type="number"
                name="CONTACT_NO"
                value={formData.CONTACT_NO}
                onChange={handleInputChange}
              ></InputText>
              <InputText
                width={"30vh"}
                height={"100%"}
                label={"EMAIL"}
                type="email"
                name="EMAIL"
                value={formData.EMAIL}
                onChange={handleInputChange}
              ></InputText>
            </div>
            <div style={{ flexDirection: "row", display: "flex" }}>
              <InputSelect
                width={"30vh"}
                height={"6vh"}
                label={"STATUS"}
                type="select"
                name="STATUS"
                value={formData.STATUS}
                onChange={handleInputChange}
              ></InputSelect>
            </div>

            <div className="buttons-container">
              <ButtonComponent
                text="SUBMIT"
                onClick={checkFormCompletion}
                backgroundColor={"#FFECEC"}
              ></ButtonComponent>
            </div>
          </div>
          <div>
            <img className="cloud" src={cloud}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
