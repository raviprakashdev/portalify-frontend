import React from 'react';
import Typed from "react-typed";
import { Player } from '@lottiefiles/react-lottie-player';
const WelcomeScreen = () => {

  const textLines = [
    `Hey! Check out the nice library Typed.js!`,
    `It's animating <b>any text</b> you pass to it. <b>Just one line</b> of code!`,
    `In this example I've used React.js wrapper for Typed.js: <b>react-typed</b>`,
    `Such a cool effect, isn't it?`
  ];



  return (
    <section className='welcome-screen'>
      <div className='container'>

        <div className='logo'> <img src={require('../assets/logos/Logo-white.png')} alt="logo" className="img-fluid" /> </div>

        <div className='row'>
          <Player
            className='confetti confetti_1'
            autoplay={true}
            loop={true}
            controls={true}
            src="https://assets8.lottiefiles.com/packages/lf20_jR229r.json">
          </Player>
          <Player
            className='confetti confetti_2'
            autoplay={true}
            loop={true}
            controls={true}
            src="https://assets8.lottiefiles.com/packages/lf20_jR229r.json">
          </Player>




          <div className="welcome-content">
            <Typed strings={textLines} typeSpeed={60} />
          </div>

          <Player
            className='confetti confetti_3'
            autoplay={true}
            loop={true}
            controls={true}
            src="https://assets8.lottiefiles.com/packages/lf20_jR229r.json">
          </Player>
          <Player
            className='confetti confetti_4'
            autoplay={true}
            loop={true}
            controls={true}
            src="https://assets8.lottiefiles.com/packages/lf20_jR229r.json">
          </Player>

        </div>



      </div>
    </section>


  );
};

export default WelcomeScreen;
