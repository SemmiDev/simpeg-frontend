import { useEffect, useRef, useState } from 'react';
import useQuery from '../../hooks/use-query';
import { Button, Spinner, Table, TextInput } from 'flowbite-react';
import uuid from 'react-uuid';
import { MyBadge } from '../../components/badge';

const RekapLembur = () => {
    const currentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return `${year}-${month < 10 ? `0${month}` : month}`;
    };

    const [date, setDate] = useState(useQuery().get('date') || currentDate());

    const [isLoading, setIsLoading] = useState(true);
    const [dataRekapLembur, setDataRekapLembur] = useState([]);
    const [filteredDataRekapLembur, setFilteredDataRekapLembur] = useState([]);

    // ctrl + k for activate search input
    const searchRef = useRef(null);

    const filterData = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const filteredData = dataRekapLembur.filter((data) => {
                return (
                    data.lembur.nik
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    data.lembur.nama
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    data.lembur.jabatan
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    data.lembur.gaji_pokok
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    data.lembur.basis
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
                );
            });
            setFilteredDataRekapLembur(filteredData);
        } else {
            setFilteredDataRekapLembur(dataRekapLembur);
        }
    };

    const getDataRekapLembur = async () => {
        setIsLoading(true);

        if (!date) {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1; // because january is 0!
            setDate(`${year}-${month}`);
        }

        const url = `http://localhost:8080/api/lembur?date=${date}`;
        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDataRekapLembur(data);
                setFilteredDataRekapLembur(data);
            });
        setIsLoading(false);
    };

    useEffect(() => {
        getDataRekapLembur();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && (event.key === 'K' || event.key === 'k')) {
                event.preventDefault();
                searchRef.current.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className='space-y-5'>
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-3'>
                    <a href='/tambah-rekap-lembur'>
                        <Button size={'sm'} color='info'>
                            Tambah Data
                        </Button>
                    </a>
                    <Button outline={true} color='light'>
                        Data Lembur bulan{' '}
                        {new Date(
                            date.split('-')[0],
                            date.split('-')[1] - 1
                        ).toLocaleString('default', {
                            month: 'long',
                            year: 'numeric',
                        })}
                    </Button>
                </div>
                <div>
                    <div className='flex items-center gap-x-5'>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                window.location.href = `/rekap-lembur?date=${date}`;
                            }}
                        >
                            <TextInput
                                type='text'
                                placeholder='Tahun-Bulan'
                                size={'sm'}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                name='date'
                                className='w-32'
                            />
                            <input type='submit' hidden={true} />
                        </form>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <svg
                                    aria-hidden='true'
                                    className='w-5 h-5 text-gray-500 dark:text-gray-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                    />
                                </svg>
                            </div>
                            <input
                                type='search'
                                ref={searchRef}
                                className='block w-48 p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                placeholder='Search (Ctrl + k)'
                                onChange={(e) => filterData(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className='mt-12 mx-auto flex justify-center item-center'>
                    <Spinner
                        color='info'
                        className='w-16 h-16'
                        aria-label='Purple spinner example'
                    />
                </div>
            ) : (
                <div className='overflow-auto h-[550px]'>
                    <Table hoverable={true}>
                        <Table.Head>
                            <Table.HeadCell>NIK</Table.HeadCell>
                            <Table.HeadCell>Nama</Table.HeadCell>
                            <Table.HeadCell>Jabatan</Table.HeadCell>
                            <Table.HeadCell>Gaji Pokok</Table.HeadCell>
                            <Table.HeadCell>Basis</Table.HeadCell>
                            <Table.HeadCell>
                                <span className='sr-only'></span>
                            </Table.HeadCell>
                            <Table.HeadCell>
                                <span className='sr-only'></span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='divide-y'>
                            {filteredDataRekapLembur.map((data) => (
                                <Table.Row
                                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                                    key={uuid()}
                                >
                                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                        {data.lembur.nik}
                                    </Table.Cell>
                                    <Table.Cell>{data.lembur.nama}</Table.Cell>
                                    <Table.Cell>
                                        {data.lembur.jabatan}
                                    </Table.Cell>
                                    <Table.Cell className='w-32'>
                                        <MyBadge
                                            title={data.lembur.gaji_pokok}
                                        ></MyBadge>
                                    </Table.Cell>
                                    <Table.Cell className='w-32'>
                                        <MyBadge
                                            title={data.lembur.basis}
                                            color='warning'
                                        ></MyBadge>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <a
                                            href={`/rekap-lembur/details?id=${data.lembur.id}&date=${date}`}
                                        >
                                            <Button
                                                size={'xs'}
                                                color={'purple'}
                                            >
                                                Data Lembur
                                            </Button>
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default RekapLembur;
