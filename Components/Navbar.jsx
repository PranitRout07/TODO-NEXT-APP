import React from "react";

const NavBar = () => {
    return (
        <div className="flex p-4 flex-wrap justify-around bg-slate-500">
            <h1 className="text-lg font-semibold">TODO App</h1>
            <ul className="flex flex-wrap space-x-[40px] font-semibold">
                <li>Home</li>
                <li>Products</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
    )
}

export default NavBar;