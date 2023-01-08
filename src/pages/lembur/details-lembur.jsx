import {
    Spinner,
    TextInput,
    Button,
    Tabs,
    Timeline,
    Label,
} from 'flowbite-react';
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

    const [tanggalLembur, setTanggalLembur] = useState([]);

    const [currentDate, setCurrentDate] = useState(null);
    const [currenJam, setCurrentJam] = useState(null);

    const [detailsLembur, setDetailsLembur] = useState({});
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

    const saveTanggalLembur = async () => {
        await fetch(`http://localhost:8080/api/tanggal_lembur?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tanggalLembur),
        })
            .then((res) => res.json())
            .then(() => {
                window.location.reload();
            });
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
                    <div className='bg-white border-[#5f9ea0] overflow-hidden border space-y-5 w-[700px] rounded-t-xl h-[600px] rounded-b-xl pb-3 shadow-lg'>
                        <Tabs.Group
                            aria-label='Tabs with icons'
                            style='default'
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
                                <div className='mx-auto flex gap-x-5 gap-y-2 flex-wrap items-center  m-5 p-5 rounded-lg'>
                                    {detailsLembur.list_tanggal_lembur &&
                                        detailsLembur.list_tanggal_lembur.map(
                                            (data, index) => {
                                                return (
                                                    <LemburBadge
                                                        key={index}
                                                        title={
                                                            data.tanggal + ' ➤ '
                                                        }
                                                        totalJam={
                                                            data.total_jam
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                </div>
                            </Tabs.Item>

                            <Tabs.Item title='Tambah Jam Lembur'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-4 border border-gray-500/30 p-5 rounded-lg'>
                                        <div>
                                            <div className='mb-2 block'>
                                                <Label
                                                    htmlFor='tanggalLembur'
                                                    value='Pilih Tanggal Lembur'
                                                />
                                            </div>
                                            <TextInput
                                                onChange={(e) =>
                                                    setCurrentDate(
                                                        e.target.value
                                                    )
                                                }
                                                value={currentDate}
                                                id='tanggalLembur'
                                                type='date'
                                                required={true}
                                            />
                                        </div>
                                        <div>
                                            <div className='mb-2 block'>
                                                <Label
                                                    htmlFor='totalJam'
                                                    value='Masukkan Total Jam'
                                                />
                                            </div>
                                            <TextInput
                                                value={currenJam}
                                                onChange={(e) =>
                                                    setCurrentJam(
                                                        e.target.value
                                                    )
                                                }
                                                id='totalJam'
                                                type='number'
                                                placeholder='Total Jam'
                                                required={true}
                                            />
                                        </div>
                                        <div className='flex items-center gap-3 justify-end'>
                                            <Button
                                                onClick={() => {
                                                    // add one object to array tanggalLembur
                                                    setTanggalLembur([
                                                        ...tanggalLembur,
                                                        {
                                                            tanggal:
                                                                currentDate,
                                                            total_jam:
                                                                parseFloat(
                                                                    currenJam
                                                                ),
                                                        },
                                                    ]);
                                                }}
                                                color={'purple'}
                                            >
                                                Tambah
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    if (
                                                        tanggalLembur.length ===
                                                        0
                                                    ) {
                                                        alert(
                                                            'Data Lembur Tidak Boleh Kosong'
                                                        );
                                                    } else {
                                                        saveTanggalLembur();
                                                    }
                                                }}
                                            >
                                                Simpan
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='flex flex-wrap overflow-auto gap-4 border border-gray-500/30 p-5 rounded-lg'>
                                        {tanggalLembur.map((tanggal, index) => (
                                            <div
                                                key={index}
                                                className='flex justify-center items-center gap-2'
                                            >
                                                <span className='text-xs'>
                                                    {tanggal.tanggal}
                                                </span>
                                                <span className='text-xs font-semibold'>
                                                    {tanggal.total_jam} Jam
                                                </span>
                                                <Button
                                                    size={'xs'}
                                                    color={'failure'}
                                                    onClick={() => {
                                                        setTanggalLembur(
                                                            tanggalLembur.filter(
                                                                (item) =>
                                                                    item !==
                                                                    tanggal
                                                            )
                                                        );
                                                    }}
                                                    type='button'
                                                    variant='danger'
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
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
