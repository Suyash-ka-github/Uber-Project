import React from 'react';
const LocationSearchPanel = ({ suggestion ,setStart,setEnd,activeField}) => {
  const handleSuggestionClick = (suggestion) => {
  
        if (activeField === 'start') {
            setStart(suggestion)
        } else if (activeField === 'end') {
            setEnd(suggestion)
        }
    }
  return (
    <div>
            {
  suggestion.map((elem, idx) => (
    <div
      key={idx} onClick={() => handleSuggestionClick(elem)}
      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition duration-200 cursor-pointer mb-2 hover:border-black"
    >
      <div className="bg-gray-100 p-2 rounded-full text-black">
        <i className="ri-map-pin-fill text-lg" />
      </div>
      <h4 className="text-gray-800 text-base font-medium">{elem}</h4>
    </div>
  ))
}

        </div>
  );
};

export default LocationSearchPanel;

