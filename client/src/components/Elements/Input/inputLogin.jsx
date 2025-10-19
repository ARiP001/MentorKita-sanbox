import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
function InputLogin({ type, placeholder, name }) {
  const [value, setValue] = useState('');

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <input
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={handleInputChange}
        className="w-[350px] h-[60px] mx-auto bg-[#ECECEC] rounded-lg px-3 py-2 mt-1 lg:w-[464px] lg:h-[62px] lg:py-[10px] lg:px-[22px]"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default InputLogin;
