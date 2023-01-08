import './App.css';
import TopNavBar from './components/top-navigation';
import SideBar from './components/sidebar';
import { Route, Routes } from 'react-router-dom';
import RekapLembur from './pages/lembur/rekap-lembur';
import DetailsLembur from './pages/lembur/details-lembur';
import TambahRekapLembur from './pages/lembur/tambah-rekap-lembur';

export default function App() {
    return (
        <div className='min-h-screen  mx-auto w-full antialiased'>
            <TopNavBar />
            <Routes>
                <Route
                    path='/'
                    element={
                        <SideBar active='dashboard'>Selamat Datang</SideBar>
                    }
                />
                <Route
                    path='/rekap-lembur'
                    element={
                        <SideBar active='rekap-lembur'>
                            <RekapLembur />
                        </SideBar>
                    }
                />
                <Route
                    path='/rekap-lembur/details'
                    element={
                        <SideBar active='rekap-lembur'>
                            <DetailsLembur />
                        </SideBar>
                    }
                />
                <Route
                    path='/non-karyawan'
                    element={
                        <SideBar active='non-karyawan'>
                            <div>Hello</div>
                        </SideBar>
                    }
                />
                <Route
                    path='/tambah-rekap-lembur'
                    element={
                        <SideBar active='rekap-lembur'>
                            <TambahRekapLembur />
                        </SideBar>
                    }
                />
            </Routes>
        </div>
    );
}
