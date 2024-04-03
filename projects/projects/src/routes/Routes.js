import React from 'react';
import {Routes , Route } from "react-router-dom" 
import SignIn from '../views/SignIn/SignIn';
import SignUp from '../views/SignUp/SignUp';
import CompleteProfile from '../views/CompleteProfile/CompleteProfile';
import VerifyAccount from '../views/VerifyAccount/VerifyAccount';
import VerifyMessage from '../views/VerifyMessage/VerifyMessage';
import PasswordResetMail from '../views/PasswordResetMail/PasswordResetMail';
import VerifyAccountReset from '../views/VerifyAccountReset/VerifyAccountReset';
import PasswordReset from '../views/PasswordReset/PasswordReset';

const MainRoutes = () => {
    return (
    <Routes> 
            <Route path="/" element={<SignIn/> } />
            <Route path="/register" element={<SignUp/> } /> 
            <Route path="/register/account" element={<CompleteProfile/> } /> 
            <Route path="/account/verify-account" element={<VerifyAccount/> } /> 
            <Route path="/account/verify-message" element={<VerifyMessage/> } /> 
            <Route path="/account/reset/request" element={<PasswordResetMail/> } /> 
            <Route path="/account/reset/verify" element={<VerifyAccountReset/> } /> 
            <Route path="/account/reset" element={<PasswordReset/> } /> 
            <Route path="/admin/meals" element={<MealTable/> } /> 
            <Route path="/admin/transport" element={<TransportTable/> } /> 
            <Route path="/meals" element={<UserMealTable/> } /> 
            <Route path="/transport" element={<TransportTableUser/> } /> 
            <Route path="/admin/upload" element={<UploadFileAdmin/> } /> 
            <Route path="/upload" element={<UploadFileUser/> } /> 
            <Route path="/profile" element={<ProfilePage/> } /> 
            <Route path="/admin/profile" element={<AdminProfile/> } /> 
    </Routes> 
    );
};

export default MainRoutes;
