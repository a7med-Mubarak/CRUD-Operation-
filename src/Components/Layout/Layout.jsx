import React from "react";
import { Outlet } from "react-router-dom";
import Style from "./Layout.module.css";
import BG from '../../Assets/images/phone.jpg'


export default function Layout(){
    return <Outlet>
            <div className={Style.BG}></div>

    </Outlet>
}

