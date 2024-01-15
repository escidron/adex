'use client';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



export default function TextField({
  id,
  label,
  onChange,
  onBlur,
  onInput,
  value,
  type,
  disabled,
  formatPrice,
  register,
  required,
  errors,
  maxLength,
  autoFocus
}) {
  return (
    <div className="w-full relative shadow-sm">
      {formatPrice && (
        <p className='absolute top-[15px] left-2 text-[18px] font-[400] '>$</p>
      )}
      <input
        name={id}
        autoFocus={autoFocus ? autoFocus : false}
        autoComplete='current-field'
        id={id}
        placeholder=" "
        type={type ? type : "text"}
        onChange={onChange ? onChange : ''}
        onBlur={onBlur ? onBlur : ''}
        onInput={formatPrice?onInput:()=>{}}
        value={value}
        maxLength={maxLength ? maxLength : ''}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border
          rounded-md
          outline-none
          transition
          h-[55px]
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors ? 'border-red-700' : ''}
          ${formatPrice ? 'pl-8' : 'pl-4'}

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
          top-4 
           
          origin-[0] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          peer-focus:font-[600]
          ${value ? 'scale-75 font-[600]' : ''}
          ${errors ? 'text-red-700' : ''}
          ${formatPrice ? 'left-8' : 'left-4'}

        `}
      >
        {label}
      </label>
    </div>
  );
}

