import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/style.css';
import { Button} from 'reactstrap';
import ReactDOM from "react-dom/client";
import { Route, Routes } from 'react-router-dom';
import SigninScreen from './pages/SigninScreen';
import SignInForm from './components/forms/SignInForm';
import RegisterForm1 from './components/forms/RegisterForm1';
import RegisterForm2 from './components/forms/RegisterForm2';
import WelcomeScreen from './pages/WelcomeScreen';
import ConfirmAuthScreen from './pages/ConfirmAuthScreen';
import ForgotPassword from './components/forms/ForgotPassword';
import DashboardScreen from './pages/DashboardScreen';
import Leads from './components/dashboard/leads';
import Mail from './components/dashboard/mail';
import FormBuilderScreen from './pages/FormBuilderScreen';

export function App() {
  return (
    <div>
      
      
    {/* <SigninScreen form={SignInForm}/> */}
    {/* <SigninScreen form={RegisterForm1}/> */}
    {/* <SigninScreen form={RegisterForm2}/> */}
    {/* <WelcomeScreen/> */}
    {/* <ConfirmAuthScreen/> */}
    {/* <ForgotPassword/> */}
     {/* <SigninScreen form={ForgotPassword}/> */}
     

     
      {/* <DashboardScreen>
        <Routes>
          <Route path="/" element={<Leads/>} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/mail" element={<Mail />} />
        </Routes>
      </DashboardScreen> */}

      <FormBuilderScreen/>

    </div>
  )
}
export default App
