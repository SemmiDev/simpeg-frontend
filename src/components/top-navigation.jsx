import { Avatar, Dropdown, Navbar, Sidebar } from 'flowbite-react';
import Logo from '../assets/logo.png';

const TopNavBar = () => {
    return (
        <Navbar border={true} fluid={true} rounded={true}>
            <Navbar.Brand href='https://flowbite.com/' className='px-10'>
                <img src={Logo} className='mr-3 h-8' alt='Simpeg Logo' />
                <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
                    simpeg
                </span>
            </Navbar.Brand>
            <div className='px-10 flex md:order-2'>
                <Dropdown
                    arro
                    inline={true}
                    label={
                        <div className='flex gap-3 items-center'>
                            <Avatar
                                color={'success'}
                                alt='User settings'
                                bordered={true}
                                img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                rounded={true}
                            />
                            Admin
                        </div>
                    }
                >
                    <Dropdown.Header>
                        <span className='block text-sm'>Admin</span>
                        <span className='block truncate text-sm font-medium'>
                            admin@gmail.com
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={() => (window.location.href = '/')}>
                        Dashboard
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
        </Navbar>
    );
};

export default TopNavBar;
