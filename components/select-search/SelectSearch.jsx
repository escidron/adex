import { useState } from 'react'
import Select from 'react-select';
import classNames from 'classnames';

export default function SelectSearchComponent({ options,selectedMerchant,setSelectedMerchant }) {

    return (

        <Select
            className='w-full h-full border rounded-lg px-3 cursor-pointer'
            placeholder='Select Industry...'
            defaultValue={selectedMerchant}
            onChange={setSelectedMerchant}
            options={options}
            unstyled
            classNames={{
                menu: ({ isDisabled, isFocused }) =>
                  classNames(
                    ' bg-white border mt-1 ml-[-10px]  '

                  ),
                option: ({ isDisabled, isFocused, isSelected }) =>
                  classNames(
                    'p-2 w-full cursor-pointer',
                    isSelected && 'bg-black text-white',
                    !isSelected && isFocused && 'bg-slate-200 text-black'
                  ),
              }}
              


        />
    )
}
