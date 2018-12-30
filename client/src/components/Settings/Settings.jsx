import React from 'react';
import PropTypes from 'prop-types';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkButton from 'bpk-component-button';
import BpkModal from 'bpk-component-modal';
import BpkLargeSettingsIcon from 'bpk-component-icon/lg/settings';
import { withLargeButtonAlignment } from 'bpk-component-icon';

import STYLES from './Settings.scss';

const AlignedSettingsIcon = withLargeButtonAlignment(BpkLargeSettingsIcon);


class Settings extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.state = {
      isOpen: false,
      showVocab: props.showVocab,
      charUp: props.charUp,
    };
    this.changeShowVocab = this.changeShowVocab.bind(this);
    this.changeCharUp = this.changeCharUp.bind(this);
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
    console.log('change show vocab');
    const showing = !this.state.showVocab;
    this.setState({
      showVocab: showing,
    });
    this.props.changeShowVocab(showing);
  }

  changeCharUp() {
    console.log('change char up xxx', this.state);
    const up = !this.state.charUp;
    this.setState({
      charUp: up,
    });
    console.log('chaaarrr', up);
    this.props.changeCharUp(up);
  }

  render() {
    return (
      <div id="setting-modal-container">
        <div id="settings">
          <BpkButton iconOnly secondary onClick={this.onOpen}><AlignedSettingsIcon /><span className="visually-hidden">Settings</span></BpkButton>
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
          <div className={STYLES.Settings__form}>
            <BpkCheckbox
              className={STYLES.Settings__checkbox}
              name="vocabLevelToggle"
              label="Show vocab level"
              onChange={() => { this.changeShowVocab(); }}
              defaultChecked={this.state.showVocab}
            />
            <BpkCheckbox
              className={STYLES.Settings__checkbox}
              name="charUpToggle"
              label="Show Chinese character fist"
              onChange={() => { this.changeCharUp(); }}
              defaultChecked={this.state.charUp}
            />
            <BpkButton
              secondary
              onClick={this.onClose}
              className={STYLES.Settings__close}
            >
              Close
            </BpkButton>
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
