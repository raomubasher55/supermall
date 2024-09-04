import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Notify from './components/Notify';
import User from './userComponent/User';
import Withdraw from './userComponent/Linkcomponents/Withdraw';
import RechargeRecord from './userComponent/Linkcomponents/RechargeRecord';
import WithdrawRecord from './userComponent/Linkcomponents/WithdrawRecord';
import AccountDetal from './userComponent/Linkcomponents/AcountDetail';
import Address from './userComponent/Linkcomponents/Address';
import BankForm from './userComponent/Linkcomponents/Bankform';
import PasswordChange from './userComponent/Linkcomponents/PasswordChange';
import PasswordWithdraw from './userComponent/Linkcomponents/PasswordWithdraw';
import Recharge from './components/homeComponent/Recharge';
import InviteLink from './components/homeComponent/InviteLink';
import About from './components/homeComponent/About';
import HelpCenter from './components/homeComponent/Helpcenter';
import MerchantCenter from './components/Marchant';
import InviteReward from './components/homeComponent/InviteReward';
import Task from './components/Task';
import GrabLevel from './components/homeComponent/Grab';
import Login from './components/Login';
import Success from './components/Success';
import Fail from './components/Fail';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/Signup';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import CompletedOrders from './components/CompeletedOrders';
import UnpaidOrders from './components/UnpaidOrders';
import AllOrders from './components/AllOrders';



export default function App() {
  return (
    <div>
      <BrowserRouter>
       <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>

          <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
          <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />

      <Route path='/task' element={
        <ProtectedRoute>
          <Task />
        </ProtectedRoute>
      } />

      <Route path="/grab" element={
        <ProtectedRoute>
          <GrabLevel />
        </ProtectedRoute>
      } />

      <Route path="/notify" element={
        <ProtectedRoute>
          <Notify />
        </ProtectedRoute>
      } />

      <Route path='/user' element={
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      } />

      <Route path='/withdraw' element={
        <ProtectedRoute>
          <Withdraw />
        </ProtectedRoute>
      } />

      <Route path='/recharge' element={
        <ProtectedRoute>
          <Recharge />
        </ProtectedRoute>
      } />

      <Route path='/invite' element={
        <ProtectedRoute>
          <InviteLink />
        </ProtectedRoute>
      } />

      <Route path='/about' element={
        <ProtectedRoute>
          <About />
        </ProtectedRoute>
      } />

      <Route path='/help' element={
        <ProtectedRoute>
          <HelpCenter />
        </ProtectedRoute>
      } />

      <Route path='/merchant' element={
        <ProtectedRoute>
          <MerchantCenter />
        </ProtectedRoute>
      } />

      <Route path='/invitereward' element={
        <ProtectedRoute>
          <InviteReward />
        </ProtectedRoute>
      } />

      <Route path='/rechargerecord' element={
        <ProtectedRoute>
          <RechargeRecord />
        </ProtectedRoute>
      } />

      <Route path='/withdrawrecord' element={
        <ProtectedRoute>
          <WithdrawRecord />
        </ProtectedRoute>
      } />

      <Route path='/accountdetail' element={
        <ProtectedRoute>
          <AccountDetal />
        </ProtectedRoute>
      } />

      <Route path='/address' element={
        <ProtectedRoute>
          <Address />
        </ProtectedRoute>
      } />

      <Route path='/bankform' element={
        <ProtectedRoute>
          <BankForm />
        </ProtectedRoute>
      } />

      <Route path='/changepassword' element={
        <ProtectedRoute>
          <PasswordChange />
        </ProtectedRoute>
      } />

      <Route path='/passwordwithdraw' element={
        <ProtectedRoute>
          <PasswordWithdraw />
        </ProtectedRoute>
      } />

      <Route path='/success' element={
        <ProtectedRoute>
          <Success />
        </ProtectedRoute>
      } />

      <Route path='/fail' element={
        <ProtectedRoute>
          <Fail />
        </ProtectedRoute>
      } />

      <Route path='/compeleted-orders' element={
        <ProtectedRoute>
          <CompletedOrders/>
        </ProtectedRoute>
      } />

      <Route path='/unpaid-orders' element={
        <ProtectedRoute>
          <UnpaidOrders/>
        </ProtectedRoute>
      } />
      <Route path='/all-orders' element={
        <ProtectedRoute>
          <AllOrders/>
        </ProtectedRoute>
      } />

       </Routes>
      </BrowserRouter>
    </div>
  )
}
