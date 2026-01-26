import { Link } from 'react-router-dom';

function AppLogo() {
    return (
        <h1 className="
            font-dancing
            text-3xl
            w-fit
            h-[50px]
            bg-black
            text-white
            px-[15px]
            py-[5px]
            leading-[1.4]
            shrink-0
            flex items-center justify-center
        ">
            <Link to="/" className="hover:opacity-80 transition-opacity">
                Cafe Lumina
            </Link>
        </h1>
    );
};


export default AppLogo;
