'use client';





export default function TextField({
  id,
  label,
  onChange,
  onBlur,
  value,
  type,
  disabled, 
  formatPrice,
  register,
  required,
  errors,
}) {
  return (
    <div className="w-full relative">
      <input
        name={id}
        id={id}
        placeholder=" "
        type={type?type:"text"}
        onChange={onChange?onChange:''}
        onBlur={onBlur?onBlur:''}
        value={value}
        className={`
          peer
          w-full
          p-4
          pt-6 
          pl-4
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          h-[55px]
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors?'border-red-700':''}

        `}
      />
      <label 
        htmlFor={id}
        className={`
          absolute 
          text-md
          left-4
          duration-150 
          transform 
          -translate-y-3 
          top-3 
           
          origin-[0] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          peer-focus:font-[600]
          ${value?'scale-75 font-[600]':''}
          ${errors?'text-red-700':''}
        `}
      >
        {label}
      </label>
    </div>
   );
}
 
