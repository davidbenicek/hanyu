import React from 'react';
import BpkText from 'bpk-component-text';
import styled from 'styled-components';
// Internal imports
import ExerciseArea from './components/ExerciseArea';
import STYLES from './App.scss';

const hero = require('./hero2.jpg');

const c = className => STYLES[className] || 'UNKNOWN';
const StyledHeader = styled.header`
  background: url(${hero}) center;
  background-size: cover;
`;
const App = () => (
  <div className={c('App')}>
    <StyledHeader className={c('App__header')}>
      <div className={c('App__header-inner')}>
        <BpkText tagName="h1" textStyle="xxl" className={c('App__heading')}>实践你的汉语</BpkText>
      </div>
    </StyledHeader>
    <main className={c('App__main')}>
      <BpkText tagName="p" className={c('App__text')}>
        Click to turn the card over and then hover the blacked out box to find out the English translation!
      </BpkText>
      <BpkText tagName="p" className={c('App__text')}>
        Change HSK levels with the checkboxes bellow
      </BpkText>
      <BpkText tagName="p" className={c('App__text')}>
        Need a hint? Check out the examples
      </BpkText>
      <ExerciseArea />
    </main>
  </div>);

export default App;
