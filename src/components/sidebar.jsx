import {
    UilEstate,
    UilSignOutAlt,
    UilClockSeven,
} from '@iconscout/react-unicons';
import { Sidebar } from 'flowbite-react';
import { UilUserMd } from '@iconscout/react-unicons';

const SideBar = ({ children, active }) => {
    return (
        <div className='flex gap-3'>
            <div className='w-fit border-b'>
                <Sidebar aria-label='Sidebar with content separator example'>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item
                                href={`/`}
                                className={`${
                                    active == 'dashboard' && 'bg-gray-100'
                                }`}
                            >
                                <div className={`flex gap-2 items-center`}>
                                    <UilEstate
                                        className={`w-4  ${
                                            active === 'dashboard'
                                                ? 'text-gray-700'
                                                : 'text-gray-600'
                                        }`}
                                    />
                                    <span
                                        className={`text-xs ${
                                            active === 'dashboard'
                                                ? 'text-gray-700 font-semibold'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        Dashboard
                                    </span>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item
                                href={`/non-karyawan`}
                                className={`${
                                    active == 'non-karyawan' && 'bg-gray-100'
                                }`}
                            >
                                <div
                                    className={`flex gap-2 text-green-700 items-center`}
                                >
                                    <UilUserMd
                                        className={`w-4 ${
                                            active === 'non-karyawan'
                                                ? 'text-gray-700'
                                                : 'text-gray-600'
                                        }`}
                                    />
                                    <span
                                        className={`text-xs ${
                                            active === 'non-karyawan'
                                                ? 'text-gray-700 font-semibold'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        Non Karyawan
                                    </span>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item
                                href={`/rekap-lembur`}
                                className={`${
                                    active == 'rekap-lembur' && 'bg-gray-100'
                                }`}
                            >
                                <div
                                    className={`flex gap-2 text-green-700 items-center `}
                                >
                                    <UilClockSeven
                                        className={`w-4 ${
                                            active === 'rekap-lembur'
                                                ? 'text-gray-700'
                                                : 'text-gray-600'
                                        }`}
                                    />
                                    <span
                                        className={`text-xs ${
                                            active === 'rekap-lembur'
                                                ? 'text-gray-700 font-semibold'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        Rekap Lembur
                                    </span>
                                </div>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>

                        <Sidebar.ItemGroup className='absolute bottom-12'>
                            <Sidebar.Item href='#'>
                                <div className='flex gap-2 text-black items-center'>
                                    <UilSignOutAlt className='w-4 text-red-500' />
                                    <span className='text-sm text-red-500 font-semibold'>
                                        Sign Out
                                    </span>
                                </div>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>

            <div className='bg-[#f6fbfc] p-5 w-full'>{children}</div>
        </div>
    );
};

export default SideBar;
