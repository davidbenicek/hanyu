import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkTooltip from 'bpk-component-tooltip';
import BpkText from 'bpk-component-text';
import BpkCard from 'bpk-component-card';
import BpkButton from 'bpk-component-button';
import axios from 'axios';

import STYLES from './Character.scss';

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.renderCharUp = this.renderCharUp.bind(this);
    this.renderCharDown = this.renderCharDown.bind(this);
    this.turnCard = this.turnCard.bind(this);
    this.fetchWord = this.fetchWord.bind(this);
    this.addExample = this.addExample.bind(this);
    this.renderExamples = this.renderExamples.bind(this);
    this.previousWord = this.previousWord.bind(this);

    this.state = {
      char: {},
      charUp: props.charUp,
      examples: [],
      exampleCount: 0,
      examplesOut: false,
      backEnabled: false,
      history: [],
    };
    this.fetchWord();
  }

  // componentWillMount() {
  //   this.fetchWord();
  // }

  async fetchWord() {
    const { levels, charUp } = this.props;
    console.log(levels);
    const lvlQuery = Object.keys(levels).map(lvl => (
      (levels[lvl] ? lvl : '')
    )).join('');
    console.log(lvlQuery);
    const { data } = await axios({
      url: `/char?level=${lvlQuery}`,
      method: 'get',
    });
    const { history } = this.state;
    history.push(data);
    let backEnabled = false;
    if (history.length > 1) {
      backEnabled =  true;
    }

    this.setState({
      char: data,
      charUp,
      examplesOut: false,
      exampleCount: 0,
      examples: [],
      backEnabled,
      history,
    });
  }

  addExample() {
    const {
      char,
      examples,
    } = this.state;
    let { exampleCount } = this.state;
    exampleCount += 1;
    console.log(`sentence${exampleCount}` in char, exampleCount, char);
    if (`sentence${exampleCount}` in char) {
      examples.push(char[`sentence${exampleCount}`]);
      this.setState({ examples, exampleCount });
      console.log('out ', !(`sentence${exampleCount + 1}` in char));
      if (!(`sentence${exampleCount + 1}` in char)) {
        this.setState({ examplesOut: true });
      }
    } else {
      this.setState({ examplesOut: true });
    }
  }

  turnCard() {
    this.setState({ charUp: !this.state.charUp });
  }

  renderExamples() {
    console.log(this.state.examples);
    return this.state.examples.map((example, i) => (
      <div className={STYLES.Character__exampleContainer}>
        <BpkText tagName="h1" textStyle="lg" className={STYLES.Character__example}>{example.cn}</BpkText>
        <BpkText tagName="p" textStyle="base" className={STYLES.Character__translation} >{example.eng}</BpkText>
      </div>
    ));
  }

  renderCharUp() {
    console.log('up');
    return (
      <div>
        <span className={STYLES.Character__stats}>HSK: {this.state.char.HSK} Word ID:{this.state.char.id}</span>
        <BpkText tagName="h1" textStyle="xxl" className={STYLES.Character__char}>{this.state.char.chinese || ''}</BpkText>
        <BpkText tagName="p" textStyle="sm" className={STYLES.Character__type}>{this.state.char.type|| ''}</BpkText>
      </div>
    );
  }

  renderCharDown() {
    console.log('down');
    return (
      <div>
        <BpkText tagName="h1" textStyle="xxl" >{this.state.char.pinyin}</BpkText>
        <BpkText tagName="p" textStyle="base" className={STYLES.Character__translation} >{this.state.char.english}</BpkText>
      </div>
    );
  }

  previousWord() {
    const { history } = this.state;
    history.pop();
    if (history.length <= 1) {
      this.setState({ backEnabled: false });
    }
    const char = history[history.length - 1];
    this.setState({ char, history });
  }

  render() {
    return (
      <BpkGridRow>
        <BpkGridColumn width={6} offset={3} mobileWidth={12} mobileOffset={0}>
          <BpkGridRow>
            <BpkCard onClick={this.turnCard} className={STYLES.Character__card}>
              {this.state.charUp ? this.renderCharUp() : this.renderCharDown()}
            </BpkCard>
          </BpkGridRow>
          <BpkGridRow>
            <BpkGridColumn width={4} tabletWidth={12}>
              <BpkButton onClick={this.fetchWord}>Next word</BpkButton>
            </BpkGridColumn>
            <BpkGridColumn width={4} tabletWidth={12}>
              <BpkButton onClick={this.previousWord} disabled={!this.state.backEnabled}>Previous word</BpkButton>
            </BpkGridColumn>
            <BpkGridColumn width={4} tabletWidth={12}>
              <BpkButton onClick={this.addExample} disabled={this.state.examplesOut}>Show example</BpkButton>
            </BpkGridColumn>
          </BpkGridRow>
          <BpkGridRow>
            {this.renderExamples()}
          </BpkGridRow>
        </BpkGridColumn>
      </BpkGridRow>
    );
  }
}

Character.propTypes = {
  levels: PropTypes.arrayOf(PropTypes.string).isRequired,
  charUp: PropTypes.bool,
};

Character.defaultProps = {
  charUp: true,
};

export default Character;
