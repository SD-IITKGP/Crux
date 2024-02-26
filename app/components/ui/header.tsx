import logo from '../../../public/logo.svg';
const Header = () => {
    return (
        <div className='justify-evenly flex shadow-xl py-2   bg-slate-50'>
            <div className='flex container mx-auto'> <img className='rounded-full' src={logo} />
                <h2 className='text-[#5E5ADB] ml-2 text-xl font-bold'>crux</h2>
            </div>
            <img className='rounded-full w-10' src='../../public/download.png' />
        </div>
    )
}

export default Header;