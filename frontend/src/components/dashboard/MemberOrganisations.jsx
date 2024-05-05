import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Bar } from "../common/Wrappers";
import {
  DiscusstionCircleLink,
  Empty,
  ExclamationCircle,
  MemberDeleteCircle,
  OrganisationCircle,
  OrganisationCircleLink,
  TextCenterBox,
  TextCenterLink,
} from "../common/Icons";
import { UserContext } from "../../store";

const MemberOrganisations = () => {
  const { user } = useContext(UserContext);
  const [organisations, setOrganisations] = useState([]);

  const getOrganisations = async () => {
    await axios
      .get(`/members/${user._id}`)
      .then((res) => setOrganisations(res.data.organisations))
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    getOrganisations();
  }, []);

  const deleteOrganisation = async (id) => {
    await axios
      .delete("/organisations/" + id)
      .then(() => getOrganisations())
      .catch((error) => toast.error(error));
  };

  return (
    <>
      <div className='my-2'></div>
      <Bar>
        <OrganisationCircle />
        <TextCenterBox text='Organisatoins Joined' />
        <Empty />
      </Bar>

      {organisations.length ? (
        organisations.map((o) => (
          <Bar key={o._id}>
            <OrganisationCircleLink to={"/organisations/" + o._id} />
            <TextCenterLink to={o._id} text={o.name} />
            <span onClick={() => deleteOrganisation(o._id)}>
              <MemberDeleteCircle />
            </span>
            {o.approved && (
              <DiscusstionCircleLink
                to={`/discussion/organisation/${o._id}/${o.name}`}
                color='white'
              />
            )}
          </Bar>
        ))
      ) : (
        <Bar>
          <ExclamationCircle color='white' />
          <span className='p-auto m-auto'>No Organisations Joined</span>
        </Bar>
      )}

      <Outlet />
    </>
  );
};

export default MemberOrganisations;
