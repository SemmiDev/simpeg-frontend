import { Badge } from 'flowbite-react';

export const MyBadge = ({ title, color = 'info' }) => {
    return (
        <Badge size={'sm'} color={color}>
            {title}
        </Badge>
    );
};

export const LemburBadge = ({ title, totalJam }) => {
    return (
        <div className='flex items-center gap-1 bg-[#f6fbfc] shadow-lg shadow-purple-200 p-2 rounded-sm'>
            <Badge color={'purple'}>{title}</Badge>
            <Badge color={'purple'}>{totalJam} Jam</Badge>
        </div>
    );
};
