import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,

} from './ui/navigation-menu'
import Link from 'next/link';


const Header1 = () => {
    return (
        <header className="bg-blue-900 text-white">
            <div className="container mx-auto py-4 px-6 flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src="https://www.sprinklr.com/favicon-32x32.png?v=3105ca52bb3502e13ef7cf334fffe9da"
                        alt="Sprinklr Logo"
                        className="w-12 h-auto"
                    />
                    <div className="ml-2">
                        <h1 className="font-semibold text-lg">Sprinklr</h1>
                        <p className="text-xs">Unified Customer Experience Management</p>
                    </div>
                </div>
                <nav className="space-x-4">
                    <a href="#" className="hover:text-blue-300">Products</a>
                    <a href="#" className="hover:text-blue-300">Solutions</a>
                    <a href="#" className="hover:text-blue-300">Resources</a>
                    <a href="#" className="hover:text-blue-300">Company</a>
                    <a href="#" className="hover:text-blue-300">Request Demo</a>
                    <Popover>
                        <PopoverTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" fill='#fff' width="15" height="15" viewBox="0 0 21 20" className="languageselector-module--icon--5c84c"><path d="M10.36 0C4.832 0 .337 4.485.337 10S4.832 20 10.36 20s10.022-4.485 10.022-10S15.888 0 10.36 0zm0 1.25c.29 0 .607.146.969.537.361.391.73 1.014 1.042 1.812.292.746.53 1.65.707 2.651H7.641c.177-1 .415-1.905.707-2.651.313-.798.68-1.42 1.043-1.812.361-.39.679-.537.969-.537zm-2.381.332c-.3.45-.566.97-.798 1.563-.352.898-.631 1.948-.822 3.105H2.44a8.756 8.756 0 0 1 5.54-4.668zm4.762 0a8.756 8.756 0 0 1 5.537 4.668H14.36c-.19-1.157-.47-2.207-.822-3.105a8.216 8.216 0 0 0-.797-1.563zM1.957 7.5H6.21c-.085.803-.145 1.63-.145 2.5 0 .87.06 1.697.145 2.5H1.957A8.736 8.736 0 0 1 1.59 10c0-.87.131-1.708.367-2.5zm5.515 0h5.775c.09.798.154 1.626.154 2.5 0 .875-.064 1.701-.154 2.5H7.472a22.192 22.192 0 0 1-.154-2.5c0-.874.065-1.702.154-2.5zm7.038 0h4.252c.236.792.368 1.63.368 2.5 0 .87-.131 1.707-.368 2.5H14.51c.084-.803.144-1.63.144-2.5 0-.87-.06-1.697-.144-2.5zM2.444 13.75h3.915c.19 1.158.47 2.21.822 3.108a8.22 8.22 0 0 0 .795 1.558 8.755 8.755 0 0 1-5.532-4.666zm5.2 0h5.432c-.177 1-.413 1.908-.705 2.654-.312.798-.68 1.42-1.042 1.811s-.68.535-.97.535c-.29 0-.607-.144-.968-.535-.362-.39-.73-1.013-1.043-1.811-.291-.746-.527-1.654-.704-2.654zm6.716 0h3.916a8.755 8.755 0 0 1-5.533 4.666 8.19 8.19 0 0 0 .795-1.558c.352-.899.631-1.95.822-3.108z"></path></svg>
                        </PopoverTrigger>
                        <PopoverContent>
                            <ul>
                                <li>
                                    <a href="/it" className="hover:text-blue-300">Italy</a>
                                </li>
                                <li>
                                    <a href="/ja-JP" className="hover:text-blue-300">Japan</a>
                                </li>
                                <li>
                                    <a href="/ja-JP" className="hover:text-blue-300">France</a>
                                </li>
                                <li>
                                    <a href="/ja-JP" className="hover:text-blue-300">Germany</a>
                                </li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                </nav>
            </div>
        </header>
    );
};

const Header = () => {
    return <header className="bg-white-900 p-4 px-20 shadow-md flex">
        <div className="flex items-center mx-10">
            <img
                src="https://www.sprinklr.com/favicon-32x32.png?v=3105ca52bb3502e13ef7cf334fffe9da"
                alt="Sprinklr Logo"
                className="w-12 h-auto"
            />
        </div>
        <NavigationMenu className="justify-between">
            <NavigationMenuList className="gap-5">

                <NavigationMenuItem>
                    <NavigationMenuLink href='#' className='hover:text-blue-500'>
                        Products
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href={'/unified-cxm'} className='hover:text-blue-500'>
                        Unified-CXM
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink href='#' className='hover:text-blue-500'>
                        Solutions
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink href='#' className='hover:text-blue-500'>
                        Resources
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className='ml-auto'>
                    <Popover>
                        <PopoverTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" fill='' width="15" height="15" viewBox="0 0 21 20" className="languageselector-module--icon--5c84c"><path d="M10.36 0C4.832 0 .337 4.485.337 10S4.832 20 10.36 20s10.022-4.485 10.022-10S15.888 0 10.36 0zm0 1.25c.29 0 .607.146.969.537.361.391.73 1.014 1.042 1.812.292.746.53 1.65.707 2.651H7.641c.177-1 .415-1.905.707-2.651.313-.798.68-1.42 1.043-1.812.361-.39.679-.537.969-.537zm-2.381.332c-.3.45-.566.97-.798 1.563-.352.898-.631 1.948-.822 3.105H2.44a8.756 8.756 0 0 1 5.54-4.668zm4.762 0a8.756 8.756 0 0 1 5.537 4.668H14.36c-.19-1.157-.47-2.207-.822-3.105a8.216 8.216 0 0 0-.797-1.563zM1.957 7.5H6.21c-.085.803-.145 1.63-.145 2.5 0 .87.06 1.697.145 2.5H1.957A8.736 8.736 0 0 1 1.59 10c0-.87.131-1.708.367-2.5zm5.515 0h5.775c.09.798.154 1.626.154 2.5 0 .875-.064 1.701-.154 2.5H7.472a22.192 22.192 0 0 1-.154-2.5c0-.874.065-1.702.154-2.5zm7.038 0h4.252c.236.792.368 1.63.368 2.5 0 .87-.131 1.707-.368 2.5H14.51c.084-.803.144-1.63.144-2.5 0-.87-.06-1.697-.144-2.5zM2.444 13.75h3.915c.19 1.158.47 2.21.822 3.108a8.22 8.22 0 0 0 .795 1.558 8.755 8.755 0 0 1-5.532-4.666zm5.2 0h5.432c-.177 1-.413 1.908-.705 2.654-.312.798-.68 1.42-1.042 1.811s-.68.535-.97.535c-.29 0-.607-.144-.968-.535-.362-.39-.73-1.013-1.043-1.811-.291-.746-.527-1.654-.704-2.654zm6.716 0h3.916a8.755 8.755 0 0 1-5.533 4.666 8.19 8.19 0 0 0 .795-1.558c.352-.899.631-1.95.822-3.108z"></path></svg>
                        </PopoverTrigger>
                        <PopoverContent>
                            <ul>
                                <li>
                                    <a href="/it" className="hover:text-blue-300">Italy</a>
                                </li>
                                <li>
                                    <a href="/ja-JP" className="hover:text-blue-300">Japan</a>
                                </li>
                                <li>
                                    <a href="/ja-JP" className="hover:text-blue-300">France</a>
                                </li>
                                <li>
                                    <a href="/ja-JP" className="hover:text-blue-300">Germany</a>
                                </li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                </NavigationMenuItem>
            </NavigationMenuList>


        </NavigationMenu>
    </header>
}

export default Header;
