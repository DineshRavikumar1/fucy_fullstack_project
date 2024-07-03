import React, { useEffect } from 'react';
import MainSection from '../Landing/MainSection';
import CyberSecuritySection from "../Landing/LearnAboutUs";
import CompliancePage from "../Landing/ComplianceSection";
import WhyComponent from "../Landing/WhySection";
import { useDispatch } from 'react-redux';
import { changePage } from '../../store/slices/PageSectionSlice';
export default function HomePage() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(changePage('home'))
    },[]);
    return (
        <>
            <MainSection />
            <CyberSecuritySection />
            <CompliancePage />
            <WhyComponent />
        </>
    );
}
