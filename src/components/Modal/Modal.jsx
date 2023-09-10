import Modal from 'react-modal';

export const ModalWindow = ({
  props: { showModal, openedImg },
  onImageClose,
}) => {
  return (
    <Modal
      isOpen={showModal}
      className={'modal'}
      onRequestClose={onImageClose}
      ariaHideApp={false}
    >
      <img src={openedImg} alt="" />
    </Modal>
  );
};
