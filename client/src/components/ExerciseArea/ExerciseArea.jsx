import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkText from 'bpk-component-text';
import BpkCard from 'bpk-component-card';
import BpkButton from 'bpk-component-button';

import STYLES from './ExerciseArea.scss';
import Settings from '../Settings';
import Character from '../Character';

class ExerciseArea extends React.Component {
  constructor(props) {
    super(props);

    this.changeLevel = this.changeLevel.bind(this);
    this.renderLevelSelectors = this.renderLevelSelectors.bind(this);
    this.changeShowVocab = this.changeShowVocab.bind(this);
    this.changeCharUp = this.changeCharUp.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      levels: { 1: false, 2: false, 3: false },
      charUp: true,
      showVocab: false,
    };
  }

  changeShowVocab(showVocab) {
    console.log('change show vocab', showVocab, this.state);
    this.setState({
      showVocab,
    });
    const levels = { 1: false, 2: false, 3: false };
    if (showVocab) {
      levels[9] = true;
    }
    this.setState({
      levels,
    });
  }

  changeCharUp(charUp) {
    console.log('change char up lll', charUp);
    this.setState({
      charUp,
    });
  }

  changeLevel(lvl) {
    const { levels } = this.state;
    levels[lvl] = !levels[lvl];
    this.setState(levels);
  }

  renderLevelSelectors() {
    const {
      levels,
    } = this.state;
    console.log('l',Object.keys(levels));
    return Object.keys(levels).map(lvl => (
      <BpkCheckbox
        className={STYLES.ExerciseArea__levelSelectors}
        name="levelSelector"
        label={lvl === '9' ? 'Vocab' : `HSK${lvl}`}
        key={lvl === '9' ? 'Vocab' : `HSK${lvl}`}
        onChange={() => { this.changeLevel(lvl); }}
        defaultChecked={levels[lvl]}
      />));
  }

  render() {
    console.log(this.state,'state');
    const {
      showVocab,
      charUp,
    } = this.state;
    console.log(showVocab, charUp);
    return (
      <BpkGridContainer className={STYLES.ExerciseArea} >
        <BpkGridRow>
          <BpkGridColumn width={6} offset={3} mobileWidth={11} mobileOffset={0}>
            {this.renderLevelSelectors()}
          </BpkGridColumn>
          <BpkGridColumn width={1}>
            <Settings changeShowVocab={this.changeShowVocab} changeCharUp={this.changeCharUp} showVocab={showVocab} charUp={charUp} />
          </BpkGridColumn>
        </BpkGridRow>
        <Character levels={this.state.levels} charUp={charUp} />
      </BpkGridContainer>
    );
  }
}
export default ExerciseArea;
