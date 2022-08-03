import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/index.js';
import './index.css';


// function App(props) {
//   return (
//     <h1>Hi {props.name}!</h1>
//   )
// }
//
// function withWhatever(WrappedComponent) {
//   return function ComponenteDeVerdad(props) {
//     return (
//       <React.Fragment>
//         <WrappedComponent {...props}/>
//         <h2>Tamos acompañando al wrapped</h2>
//       </React.Fragment>
//     )
//   }
// }
//
//
// const AppWithWhatever = withWhatever(App)

ReactDOM.render(
  <App name='Chamaco'/>,
  // <AppWithWhatever name='Chamaco'/>,
  document.getElementById('root')
);
