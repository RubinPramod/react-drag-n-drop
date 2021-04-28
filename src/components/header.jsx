import React from "react";
import '../public/css/Header.css'

const header = () => {
    return (
        <div className = {'page-header'} >
            <h1 className = {'page-header-title'}>Applicant Tracker</h1>
            <span class="underline"></span>
        </div>
    );
}

export default header;