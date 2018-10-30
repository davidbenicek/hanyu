import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkText from 'bpk-component-text';
import BpkCard from 'bpk-component-card';
import BpkButton from 'bpk-component-button';
import axios from 'axios';

import STYLES from './ExerciseArea.scss';
import Character from '../Character';

class ExerciseArea extends React.Component {
  constructor(props) {
    super(props);

    this.changeLevel = this.changeLevel.bind(this);
    this.renderLevelSelectors = this.renderLevelSelectors.bind(this);

    this.state = {
      levels: { 1: true, 2: false, 3: false },
    };
  }
  changeLevel(lvl) {
    const { levels } = this.state;
    console.log(lvl, levels);
    levels[lvl] = !levels[lvl];
    this.setState(levels);
    console.log(levels);
  }

  renderLevelSelectors() {
    console.log('down');
    const {
      levels,
    } = this.state;
    return Object.keys(levels).map(lvl => (
      <BpkCheckbox
        className={STYLES['ExerciseArea__levelSelectors']}
        name="levelSelector"
        label={`HSK${lvl}`}
        key={`HSK${lvl}`}
        onChange={() => { this.changeLevel(lvl); }}
        defaultChecked={levels[lvl]}
      />));
  }

  render() {
    return (
      <BpkGridContainer>
        <BpkGridRow>
          <BpkGridColumn width={6} offset={3} mobileWidth={12} mobileOffset={0}>
            {this.renderLevelSelectors()}
          </BpkGridColumn>
        </BpkGridRow>
        <Character levels={this.state.levels} />
      </BpkGridContainer>
    );
  }
}
export default ExerciseArea;
