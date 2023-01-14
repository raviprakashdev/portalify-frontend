import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/style.css';
import { Button} from 'reactstrap';
import SigninScreen from './pages/SigninScreen';
import SignInForm from './components/forms/SignInForm';
import RegisterForm1 from './components/forms/RegisterForm1';
import RegisterForm2 from './components/forms/RegisterForm2';
import WelcomeScreen from './pages/WelcomeScreen';
export function App() {
  return (
    <div>
      {/* <h1>We are just starting</h1>
      <div>
        <Button color="primary">Click Me</Button>
      </div> */}
      
    {/* <SigninScreen form={SignInForm}/> */}
    {/* <SigninScreen form={RegisterForm1}/> */}
    {/* <SigninScreen form={RegisterForm2}/> */}
    <WelcomeScreen/>
    </div>
  )
}
export default App
