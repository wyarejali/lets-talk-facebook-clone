import React from 'react'

const InputField = ({ label, type, name, value, handleChange, error }) => {
  return (
    <>
      <label
        htmlFor={name}
        className='block text-md font-normal font-heading dark:text-wa-light-gray text-wa-dark-1'
      >
        {label}
      </label>
      <input
        onChange={handleChange}
        value={value}
        type={type}
        name={name}
        id={name}
        autoComplete={name}
        className={`${
          error
            ? 'border border-wa-secondary'
            : 'dark:border-wa-dark-3 border-wa-light-gray'
        } dark:bg-gray-800 mt-1 focus:ring-wa-primary focus:border-wa-primary dark:text-wa-light text-wa-dark-1 block w-full sm:text-sm font-normal rounded-md`}
      />
    </>
  )
}

export default InputField
