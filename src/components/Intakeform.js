import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Intakeform() {
    const [formData, setFormData] = useState({
      alienRegistrationNumber: '',
      countryOfBirth: '',
      regionOfBirth: '',
      countryOfCitizenship: '',
      areYouInUS: 'No',
      dateOfLastArrival: '',
      i94ArrivalDepartureRecordNumber: '',
      passportOrTravelDocumentNumber: '',
      datePassportOrTravelDocumentIssued: null,
      datePassportOrTravelDocumentExpires: null,
      passportOrTravelDocumentCountryOfIssuance: '',
      currentNonimmigrantStatus: '',
      dateStatusExpires: '',
      sevisNumber: '',
      eadNumber: '',
      StreetNumberUS: '',
      NumberUS: '',
      CityorTownUS: '',
      stateUS:  '',
      zipcodeUS: '',
      OfficeAddress: '',
      processingInfoType: [], // Array for checkboxes
      processingInfoOfficeAddress: '',
      processingInfoStateOrCountry: '',
      foreignAddressStreetNumber: '',
      foreignAddressNumber: '',
      foreignAddressCityOrTown: '',
      foreignAddressState: '',
      foreignAddressProvince: '',
      foreignAddressPostalCode: '',
      foreignAddressCountry: '',
      validPassport: 'Yes',
    });
  
    const [countries, setCountries] = useState([]);
  
    useEffect(() => {
      // Fetch country data when the component mounts
      axios
        .get('https://restcountries.com/v3.1/all')
        .then((response) => {
          // Extract the country names from the response data
          const countryNames = response.data.map((country) => country.name.common);
          setCountries(countryNames);
        })
        .catch((error) => {
          console.error('Error fetching country data:', error);
        });
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleDateChange = (name, date) => {
      setFormData({ ...formData, [name]: date });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        const updatedCheckboxes = [...formData[name]];
    
        if (checked) {
          updatedCheckboxes.push(e.target.value);
        } else {
          const index = updatedCheckboxes.indexOf(e.target.value);
          if (index !== -1) {
            updatedCheckboxes.splice(index, 1);
          }
        }
        setFormData({ ...formData, [name]: updatedCheckboxes });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send formData to the backend
        console.log(formData);
      };
  
    return (
      <div className="container mx-auto mt-10 p-4 bg-slate-200 rounded-lg">
        <h1 className="text-2xl font-semibold mb-2">Part 3. Beneficiary Information</h1>
        <h2 className="text-base font-semibold mb-3"> (Information about the beneficiary/beneficiaries you are filing for. Complete the blocks below. Use the Attachment-1 sheet to name each beneficiary included in this petition.) (continued)</h2>
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="alienRegistrationNumber" className="block text-sm font-medium text-gray-700">
                Alien Registration Number (A-Number):
              </label>
              <input
                type="text"
                name="alienRegistrationNumber"
                id="alienRegistrationNumber"
                value={formData.alienRegistrationNumber}
                onChange={handleChange}
                maxLength="9"
                className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="countryOfBirth" className="block text-sm font-medium text-gray-700">
                Country of Birth:
              </label>
              <select
                name="countryOfBirth"
                id="countryOfBirth"
                value={formData.countryOfBirth}
                onChange={handleChange}
                className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">Select a country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="regionOfBirth" className="block text-sm font-medium text-gray-700">
                Region of Birth:
              </label>
              <input
                type="text"
                name="regionOfBirth"
                id="regionOfBirth"
                value={formData.regionOfBirth}
                onChange={handleChange}
                className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="countryOfCitizenship" className="block text-sm font-medium text-gray-700">
                Country of Citizenship/Nationality:
              </label>
              <select
                name="countryOfCitizenship"
                id="countryOfCitizenship"
                value={formData.countryOfCitizenship}
                onChange={handleChange}
                className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">Select a country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-4 ">
            <label htmlFor="areYouInUS" className="block text-base text-gray-700 font-bold">
            Is the beneficiary is in the United States? <span className="text-sm font-medium text-gray-700">(If yes, complete the following:)</span>
            </label>
            <select
              name="areYouInUS"
              id="areYouInUS"
              value={formData.areYouInUS}
              onChange={handleChange}
              className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
  
          {formData.areYouInUS === 'Yes' && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="dateOfLastArrival" className="block text-sm font-medium text-gray-700">
                    Date of Last Arrival (mm/dd/yyyy):
                  </label>
                  <DatePicker
                    selected={formData.dateOfLastArrival}
                    name="dateOfLastArrival"
                    id="dateOfLastArrival"
                    onChange={(date) => handleDateChange('dateOfLastArrival', date)}
                    dateFormat="MM/dd/yyyy"
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="i94ArrivalDepartureRecordNumber" className="block text-sm font-medium text-gray-700">
                    I-94 Arrival-Departure Record Number:
                  </label>
                  <input
                    type="text"
                    name="i94ArrivalDepartureRecordNumber"
                    id="i94ArrivalDepartureRecordNumber"
                    value={formData.i94ArrivalDepartureRecordNumber}
                    onChange={handleChange}
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="passportOrTravelDocumentNumber" className="block text-sm font-medium text-gray-700">
                    Passport or Travel Document Number:
                  </label>
                  <input
                    type="text"
                    name="passportOrTravelDocumentNumber"
                    id="passportOrTravelDocumentNumber"
                    value={formData.passportOrTravelDocumentNumber}
                    onChange={handleChange}
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="datePassportOrTravelDocumentIssued" className="block text-sm font-medium text-gray-700">
                    Date Passport or Travel Document Issued (mm/dd/yyyy):
                  </label>
                  <DatePicker
                    selected={formData.datePassportOrTravelDocumentIssued}
                    name="datePassportOrTravelDocumentIssued"
                    id="datePassportOrTravelDocumentIssued"
                    onChange={(date) => handleDateChange('datePassportOrTravelDocumentIssued', date)}
                    dateFormat="MM/dd/yyyy"
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="datePassportOrTravelDocumentExpires"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Passport or Travel Document Expires (mm/dd/yyyy):
                  </label>
                  <DatePicker
                    selected={formData.datePassportOrTravelDocumentExpires}
                    name="datePassportOrTravelDocumentExpires"
                    id="datePassportOrTravelDocumentExpires"
                    onChange={(date) => handleDateChange('datePassportOrTravelDocumentExpires', date)}
                    dateFormat="MM/dd/yyyy"
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="passportOrTravelDocumentCountryOfIssuance"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Passport or Travel Document Country of Issuance:
                  </label>
                  <input
                    type="text"
                    name="passportOrTravelDocumentCountryOfIssuance"
                    id="passportOrTravelDocumentCountryOfIssuance"
                    value={formData.passportOrTravelDocumentCountryOfIssuance}
                    onChange={handleChange}
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="currentNonimmigrantStatus" className="block text-sm font-medium text-gray-700">
                    Current Nonimmigrant Status:
                  </label>
                  <input
                    type="text"
                    name="currentNonimmigrantStatus"
                    id="currentNonimmigrantStatus"
                    value={formData.currentNonimmigrantStatus}
                    onChange={handleChange}
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="dateStatusExpires" className="block text-sm font-medium text-gray-700">
                    Date Status Expires or D/S (mm/dd/yyyy):
                  </label>
                  <input
                    type="text"
                    name="dateStatusExpires"
                    id="dateStatusExpires"
                    value={formData.dateStatusExpires}
                    onChange={handleChange}
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label htmlFor="sevisNumber" className="block text-sm font-medium text-gray-700">
                  Student and Exchange Visitor Information System (SEVIS) Number (if any):
                </label>
                <input
                  type="text"
                  name="sevisNumber"
                  id="sevisNumber"
                  value={formData.sevisNumber}
                  onChange={handleChange}
                  className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="eadNumber" className="block text-sm font-medium text-gray-700">
                  Employment Authorization Document (EAD) Number (if any):
                </label>
                <input
                  type="text"
                  name="eadNumber"
                  id="eadNumber"
                  value={formData.eadNumber}
                  onChange={handleChange}
                  className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
            <h1 className="block text-base text-gray-700 font-bold">Current Residential U.S. Address <span className="text-sm font-medium text-gray-700">(if applicable) (do not list a P.O. Box)</span></h1>
            <div className="flex justify-between space-x-2">
                {/* Street Number and Name */}
                <div className="flex-1">
                    <label htmlFor="streetNumber" className="block text-sm font-medium text-gray-700">
                    Street Number:
                    </label>
                    <input
                    type="text"
                    name="streetNumber"
                    id="streetNumber"
                    value={formData.streetNumber}
                    onChange={handleChange}
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                {/* Number */}
                <div className="flex-1">
                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                    Number:
                    </label>
                    <input
                    type="text"
                    name="number"
                    id="number"
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label htmlFor="cityOrTown" className="block text-sm font-medium text-gray-700">
                    City or Town:
                    </label>
                    <input
                    type="text"
                    name="cityOrTown"
                    id="cityOrTown"
                    value={formData.cityOrTown}
                    onChange={handleChange}
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State:
                    </label>
                    <input
                    type="text"
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    Zip Code:
                    </label>
                    <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                </div>
        {/* Part 4. Processing Information */}
        <h1 className="text-2xl font-semibold mb-1">Part 4. Processing Information</h1>
        <h2 className="font-semibold mb-1 text-sm">
        If a beneficiary or beneficiaries named in Part 3. is/are outside the United States, or a requested extension of stay or change ofstatus cannot be granted, state the U.S. Consulate or inspection facility you want notified if this petition is approved.</h2>
        <div className="flex-1 flex items-center space-x-6">
          <label className="block text-sm font-bold text-gray-700">a. Type of Office (select only one box):</label>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="processingInfoType"
                id="consulate"
                value="Consulate"
                checked={formData.processingInfoType.includes('Consulate')}
                onChange={handleCheckboxChange}
                className="mt-1 form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <label htmlFor="consulate" className="text-sm font-medium text-gray-700">Consulate</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="processingInfoType"
                id="preFlightInspection"
                value="Pre-flight inspection"
                checked={formData.processingInfoType.includes('Pre-flight inspection')}
                onChange={handleCheckboxChange}
                className="mt-1 form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <label htmlFor="preFlightInspection" className="text-sm font-medium text-gray-700">Pre-flight inspection</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="processingInfoType"
                id="portOfEntry"
                value="Port of Entry"
                checked={formData.processingInfoType.includes('Port of Entry')}
                onChange={handleCheckboxChange}
                className="mt-1 form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <label htmlFor="portOfEntry" className="text-sm font-medium text-gray-700">Port of Entry</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label htmlFor="processingInfoOfficeAddress" className="block text-sm font-bold text-gray-700">b. Office Address (City)</label>
            <input
              type="text"
              name="processingInfoOfficeAddress"
              id="processingInfoOfficeAddress"
              value={formData.processingInfoOfficeAddress}
              onChange={handleChange}
              className="mt-1  focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="processingInfoStateOrCountry" className="block text-sm font-bold text-gray-700">c. U.S. State or Foreign Country</label>
            <input
              type="text"
              name="processingInfoStateOrCountry"
              id="processingInfoStateOrCountry"
              value={formData.processingInfoStateOrCountry}
              onChange={handleChange}
              className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4">
          <h2 className="block text-sm font-bold text-gray-700">d. Beneficiary's Foreign Address</h2>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Street Number and Name */}
            <div className="flex-1">
                    <label htmlFor="foreignAddressStreetNumber" className="block text-sm font-medium text-gray-700">
                    Street Number:
                    </label>
                    <input
                    type="text"
                    name="foreignAddressStreetNumber"
                    id="foreignAddressStreetNumber"
                    value={formData.streetNumberForeign}
                    onChange={handleChange}
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                {/* Number */}
                <div className="flex-1">
                    <label htmlFor="foreignAddressNumber" className="block text-sm font-medium text-gray-700">
                    Number:
                    </label>
                    <input
                    type="text"
                    name="foreignAddressNumber"
                    id="foreignAddressNumber"
                    className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <label htmlFor="foreignAddressCityOrTown" className="block text-sm font-medium text-gray-700">City or Town</label>
              <input
                type="text"
                name="foreignAddressCityOrTown"
                id="foreignAddressCityOrTown"
                value={formData.foreignAddressCityOrTown}
                onChange={handleChange}
                className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="foreignAddressState" className="block text-sm font-medium text-gray-700">State or Province</label>
              <input
                type="text"
                name="foreignAddressState"
                id="foreignAddressState"
                value={formData.foreignAddressState}
                onChange={handleChange}
                className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <label htmlFor="foreignAddressPostalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                name="foreignAddressPostalCode"
                id="foreignAddressPostalCode"
                value={formData.foreignAddressPostalCode}
                onChange={handleChange}
                className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="flex-1">
            <label htmlFor="foreignAddressCountry" className="block text-sm font-medium text-gray-700">
                Country:
              </label>
              <select
                name="foreignAddressCountry"
                id="foreignAddressCountry"
                value={formData.foreignAddressCountry}
                onChange={handleChange}
                className="mt-1 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">Select a country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="validPassport" className="block text-sm font-bold text-gray-700">e. Does each person in this petition have a valid passport?</label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="validPassport"
                id="validPassportYes"
                value="Yes"
                checked={formData.validPassport === 'Yes'}
                onChange={handleChange}
                className="mt-1 form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <label htmlFor="validPassportYes" className="text-sm font-medium text-gray-700">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="validPassport"
                id="validPassportNo"
                value="No"
                checked={formData.validPassport === 'No'}
                onChange={handleChange}
                className="mt-1 form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <label htmlFor="validPassportNo" className="text-sm font-medium text-gray-700">No. If no, go to <span className="font-bold">Part 9.</span> and type or print your explanation.</label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Intakeform;