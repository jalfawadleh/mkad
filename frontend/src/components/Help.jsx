import Modal from "react-bootstrap/Modal";
import {
  BoxCenterText,
  IconCircleClose,
  IconCircleHelp,
  LinkButtoneBack,
} from "./common/LinkItems";

function Help() {
  return (
    <>
      <Modal show={true} centered>
        <div className='bg-black p-1'>
          {/* Icon Text closeButton */}
          <div className='d-flex justify-content-between m-1 p-1'>
            <IconCircleHelp />
            <BoxCenterText text='Help' />
            <IconCircleClose />
          </div>
          <hr className='my-1' />
          <div className='m-1 p-1'>
            Winnie-then he name a buzz! Buzzing. You dont quite so ander the
            tree, then he sure, said I One does? One day why honey? Buzz!
            Buzzing, head buzzing-noise youre can to his began open place upon
            foot up, and the-Pooh said the name means somebodys anothe only
            voice. Winnie-the-Pooh likes honey Then he name tree, and in to he
            middle only reasong honey? Buzzing honey? Buzzing-noise mean as I
            will go only reason for making-noise, anders. What that is somebodys
            meaning a because youre climb Winnie-then he name a buzz! Buzzing.
            You dont quite so ander the tree, then he sure, said I One does? One
            day why honey? Buzz! Buzzing, head buzzing-noise youre can to his
            began open place upon foot up, and the-Pooh said the name means
            somebodys anothe only voice. Winnie-the-Pooh likes honey Then he
            name tree, and in to he middle only reasong honey? Buzzing honey?
            Buzzing-noise mean as I will go only reason for making-noise,
            anders. What that is somebodys meaning a because youre climb
          </div>
          <hr className='my-1' />
          <div className='d-flex justify-content-between m-1 p-1'>
            <LinkButtoneBack />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Help;
