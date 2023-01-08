import { TextInput } from 'flowbite-react';

const InputDetails = ({ children, title, value }) => {
    return (
        <div className='flex items-center gap-1'>
            <div className='w-28 items-center flex gap-1'>
                <div>{children}</div>
                <span className='text-xs text-gray-700'>{title}</span>
            </div>
            <TextInput
                sizing={'sm'}
                type='text'
                color={'gray'}
                required={true}
                value={value}
            />
        </div>
    );
};

export default InputDetails;
