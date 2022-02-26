import React from 'react';
import Header from "../Header/index";
import Footer from "../../component/ViewCommon/FooterWrap";
import Steps from"./component/guided";

export default function index(){
    const headerTitle="Hướng dẫn sử dụng <br/> Mini App Myspa";

    return(
        <>
            <Header
            headerTitle={headerTitle}
            />
            <Steps/>
            <Footer ActiveIcon="" />
        </>
    )
}

