import { Spinner, TextInput, Button, Tabs } from 'flowbite-react';
import { useState, useEffect } from 'react';
import InputDetails from '../../components/input';
import {
    UilCreditCard,
    UilConstructor,
    UilUserCircle,
    UilMoneyBill,
    UilWallet,
    UilClockTen,
    UilMoneyStack,
} from '@iconscout/react-unicons';
import useQuery from '../../hooks/use-query';
import { LemburBadge } from '../../components/badge';

const DetailsLembur = () => {
    const queryParam = useQuery();
    const id = queryParam.get('id');
    const [date, setDate] = useState(queryParam.get('date'));

    const [detailsLembur, setDetailsLembur] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getDetailsDataRekapLembur = async () => {
        setIsLoading(true);
        let url = `http://localhost:8080/api/lembur/${id}`;
        if (date && date != 'null') {
            url = `http://localhost:8080/api/lembur/${id}?date=${date}`;
        }

        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setDetailsLembur(data));
        setIsLoading(false);
    };

    useEffect(() => {
        getDetailsDataRekapLembur();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className='mt-12 mx-auto flex justify-center item-center'>
                    <Spinner
                        color='info'
                        className='w-16 h-16'
                        aria-label='Purple spinner example'
                    />
                </div>
            ) : (
                <>
                    <div className='bg-white border-[#5f9ea0] border space-y-5 w-[700px] rounded-t-xl rounded-b-xl overflow-hidden pb-3 shadow-lg'>
                        <Tabs.Group
                            aria-label='Tabs with icons'
                            style='underline'
                        >
                            <Tabs.Item
                                active
                                className='border-none ring-0'
                                title='Detail Rekap Lembur'
                            >
                                <form
                                    className='p-1 mx-4 my-3 flex gap-2 items-center'
                                    method='get'
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const date = e.target.date.value;
                                        const url = `/rekap-lembur/details?id=${id}&date=${date}`;
                                        window.location.href = url;
                                    }}
                                >
                                    <TextInput
                                        type='text'
                                        value={date == 'null' ? '' : date}
                                        onChange={(e) =>
                                            setDate(e.target.value)
                                        }
                                        placeholder='tahun-bulan'
                                        size={'sm'}
                                        name='date'
                                        className='w-32'
                                        required={true}
                                    />
                                    <Button
                                        type='submit'
                                        size={'sm'}
                                        color='info'
                                    >
                                        Filter
                                    </Button>
                                </form>

                                <div className='flex gap-3 items-start'>
                                    <div className='flex gap-1 border border-gray-300 mx-5 rounded-lg'>
                                        <form className='flex p-3 flex-col gap-2 mx-auto'>
                                            <InputDetails
                                                value={detailsLembur.lembur.nik}
                                                title={'NIK'}
                                            >
                                                <UilCreditCard className='text-gray-400 w-6 h-5' />
                                            </InputDetails>
                                            <InputDetails
                                                value={
                                                    detailsLembur.lembur.nama
                                                }
                                                title={'Nama'}
                                            >
                                                <UilUserCircle className='text-gray-400 w-6 h-5' />
                                            </InputDetails>
                                            <InputDetails
                                                value={
                                                    detailsLembur.lembur.jabatan
                                                }
                                                title={'Jabatan'}
                                            >
                                                <UilConstructor className='text-gray-400 w-6 h-5' />
                                            </InputDetails>
                                            <InputDetails
                                                value={
                                                    detailsLembur.lembur
                                                        .gaji_pokok
                                                }
                                                title={'Gaji Pokok'}
                                            >
                                                <UilMoneyBill className='text-gray-400 w-6 h-5' />
                                            </InputDetails>
                                            <InputDetails
                                                value={
                                                    detailsLembur.lembur.basis
                                                }
                                                title={'Basis'}
                                            >
                                                <UilMoneyStack className='text-gray-400 w-6 h-5' />
                                            </InputDetails>

                                            <div className='border-b my-5 border-gray-300'></div>

                                            <InputDetails
                                                value={
                                                    detailsLembur.total_jam_lembur +
                                                    ' Jam'
                                                }
                                                title={'Total Jam Lembur'}
                                            >
                                                <UilClockTen className='text-gray-400 w-6 h-5' />
                                            </InputDetails>

                                            <InputDetails
                                                value={
                                                    detailsLembur.total_gaji_lembur
                                                }
                                                title={'Total Gaji Lembur'}
                                            >
                                                <UilWallet className='text-gray-400 w-6 h-5' />
                                            </InputDetails>
                                        </form>
                                    </div>
                                </div>
                            </Tabs.Item>
                            <Tabs.Item title='Detail Rekap Jam Lembur'>
                                <div className='flex gap-x-5 gap-y-2 flex-wrap items-center  m-5 p-5 rounded-lg'>
                                    {detailsLembur.list_tanggal_lembur.map(
                                        (data, index) => {
                                            return (
                                                <LemburBadge
                                                    key={index}
                                                    title={data.tanggal + ' ➤ '}
                                                    totalJam={data.total_jam}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </Tabs.Item>
                        </Tabs.Group>
                    </div>
                </>
            )}
        </div>
    );
};

export default DetailsLembur;
