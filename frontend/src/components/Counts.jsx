import {
  OrganisationCircle,
  MemberCircle,
  ActivityCircle,
} from "./common/Icons";

const Counts = () => {
  return (
    <>
      <div className='my-auto p-1'>
        <OrganisationCircle borderColor='warning' /> Organisations
      </div>
      <div className='my-auto p-1'>
        <ActivityCircle borderColor='success' /> Activities
      </div>
      <div className='my-auto p-1'>
        <MemberCircle borderColor='primary' /> Members
      </div>
    </>
  );
};
export default Counts;
