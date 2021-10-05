import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from'./Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

 class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPressESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPressESC);
  }

   handleKeyPressESC = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickBackdrop = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleClickBackdrop}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal