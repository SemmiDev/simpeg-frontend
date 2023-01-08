import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TambahRekapLembur() {
    const [tanggalLembur, setTanggalLembur] = useState([]);

    const [currentDate, setCurrentDate] = useState(null);
    const [currenJam, setCurrentJam] = useState(null);

    const navigate = useNavigate();

    const addDataRequest = async () => {
        const url = 'http://localhost:8080/api/lembur';
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                navigate('/rekap-lembur');
            })
            .catch((err) => {
                alert(err);
            });
    };

    const [formData, setFormData] = useState({
        nik: '',
        nama: '',
        jabatan: '',
        gaji_pokok: 0,
        basis: 0,
        tanggal_lembur: [],
    });

    return (
        <div className='space-y-5'>
            <div className='flex justify-start gap-2 w-full'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        if (tanggalLembur.length != 0) {
                            addDataRequest();
                        } else {
                            alert('Tanggal Lembur tidak boleh kosong');
                        }
                    }}
                    className='flex flex-col gap-4 border border-gray-500/30 p-5 rounded-lg'
                >
                    <div>
                        <div className='mb-2 block'>
                            <Label htmlFor='nik' value='Masukkan NIK' />
                        </div>
                        <TextInput
                            autoFocus={true}
                            value={formData.nik}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    nik: e.target.value,
                                })
                            }
                            id='nik'
                            type='number'
                            placeholder='NIK'
                            required={true}
                            shadow={true}
                        />
                    </div>
                    <div>
                        <div className='mb-2 block'>
                            <Label htmlFor='nama' value='Masukkan Nama' />
                        </div>
                        <TextInput
                            value={formData.nama}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    nama: e.target.value,
                                })
                            }
                            id='nama'
                            type='text'
                            placeholder='Nama'
                            required={true}
                            shadow={true}
                        />
                    </div>
                    <div>
                        <div className='mb-2 block'>
                            <Label htmlFor='jabatan' value='Masukkan Jabatan' />
                        </div>
                        <TextInput
                            value={formData.jabatan}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    jabatan: e.target.value,
                                })
                            }
                            id='jabatan'
                            type='text'
                            placeholder='Jabatan'
                            required={true}
                            shadow={true}
                        />
                    </div>
                    <div>
                        <div className='mb-2 block'>
                            <Label
                                htmlFor='gajipokok'
                                value='Masukkan Gaji Pokok'
                            />
                            <br />
                            <span className='text-xs italic text-red-600'>
                                tanpa titik
                            </span>
                            <br />
                            <span className='text-xs  text-sky-600'>
                                Contoh: 3670000
                            </span>
                        </div>
                        <TextInput
                            id='gajipokok'
                            value={formData.gaji_pokok}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    gaji_pokok: parseFloat(e.target.value),
                                });
                            }}
                            type='number'
                            placeholder='Gaji Pokok'
                            required={true}
                            shadow={true}
                        />
                    </div>
                    <div>
                        <div className='mb-2 block'>
                            <Label htmlFor='basis' value='Masukkan Basis' />
                            <br />
                            <span className='text-xs italic text-red-600'>
                                tanpa titik
                            </span>
                            <br />
                            <span className='text-xs  text-sky-600'>
                                Contoh: 24500
                            </span>
                        </div>
                        <TextInput
                            value={formData.basis}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    basis: parseFloat(e.target.value),
                                });
                            }}
                            id='basis'
                            type='number'
                            placeholder='Basis'
                            required={true}
                            shadow={true}
                        />
                    </div>
                    <Button color={'success'} type={'submit'}>
                        Simpan Data
                    </Button>
                </form>
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
                                onChange={(e) => setCurrentDate(e.target.value)}
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
                                onChange={(e) => setCurrentJam(e.target.value)}
                                id='totalJam'
                                type='number'
                                placeholder='Total Jam'
                                required={true}
                            />
                        </div>
                        <Button
                            onClick={() => {
                                // add one object to array tanggalLembur
                                setTanggalLembur([
                                    ...tanggalLembur,
                                    {
                                        tanggal: currentDate,
                                        total_jam: parseFloat(currenJam),
                                    },
                                ]);

                                // add to formData
                                setFormData({
                                    ...formData,
                                    tanggal_lembur: [
                                        ...tanggalLembur,
                                        {
                                            tanggal: currentDate,
                                            total_jam: parseFloat(currenJam),
                                        },
                                    ],
                                });
                            }}
                            color={'purple'}
                        >
                            Tambah Tanggal Lembur
                        </Button>
                    </div>

                    <div className='flex flex-col h-96 overflow-auto gap-4 border border-gray-500/30 p-5 rounded-lg'>
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
                                                (item) => item !== tanggal
                                            )
                                        );

                                        setFormData({
                                            ...formData,
                                            tanggal_lembur:
                                                tanggalLembur.filter(
                                                    (item) => item !== tanggal
                                                ),
                                        });
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
            </div>
        </div>
    );
}
