import React from 'react';
import Modal from 'react-modal';
import Button from '@mui/material/Button';

const customStyles = {
  content: {
    width: '50vw',
    height: '70vh',
  },
};

class UploadFileModal extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {modalIsOpen: false};
  // }

  // openModal = () => {
  //   this.setState({modalIsOpen: true})
  // }

  // closeModal = () => {
  //   this.setState({modalIsOpen: false})
  // }

  // constModal = () => {
  //   return (
  //     <div class="modal dis" style="width: 50vw; height: 70vh;">
  //       <h1>!@#@IUEH!IU@</h1>
  //     </div>
  //   )
  // }

  // render() {
  //   return (
  //     <div>
  //       <Button onClick={this.openModal}>
  //         Upload File
  //       </Button>
  //       { this.state.modalIsOpen ? <Modal/> : null }
  //     </div>
  //   );
  // }
}

export default UploadFileModal;
