import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkText from 'bpk-component-text';
import BpkCard from 'bpk-component-card';
import BpkButton from 'bpk-component-button';
import BpkModal from 'bpk-component-modal';

import STYLES from './Settings.scss';
import Character from '../Character';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      showVocab: props.showVocab,
      charUp: props.charUp,
    };
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  changeShowVocab() {
    this.setState({
      showVocabLevel: !this.state.showVocabLevel,
    });
    this.props.changeShowVocab(this.state.showVocabLevel);
  }

  changeCharUp() {
    this.setState({
      showCharUp: !this.state.showCharUp,
    });
    this.props.changeCharUp(this.state.showCharUp);
  }

  render() {
    return (
      <div id="setting-modal-container">
        <div id="settings">
          <BpkButton onClick={this.onOpen}>Settings</BpkButton>
        </div>
        <BpkModal
          id="settings"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          title="Settings"
          closeLabel="Close settings modal"
          wide
          getApplicationElement={() => document.getElementById('settings')}
          renderTarget={() => document.getElementById('setting-modal-container')}
        >
          <div>
            <BpkCheckbox
              className={STYLES['']}
              name="charUpToggle"
              label="Show Chinese character fist"
              onChange={() => { this.changeShowVocab(); }}
              defaultChecked={this.state.showVocab}
            />
            <BpkCheckbox
              className={STYLES['']}
              name="vocabLevelToggle"
              label="Show vocab level"
              onChange={() => { this.changeCharUp(); }}
              defaultChecked={this.state.charUp}
            />
          </div>
        </BpkModal>
      </div>
    );
  }
}

Settings.propTypes = {
  changeShowVocab: PropTypes.func.isRequired,
  changeCharUp: PropTypes.func.isRequired,
  showVocab: PropTypes.bool.isRequired,
  charUp: PropTypes.bool.isRequired,
};

export default Settings;
