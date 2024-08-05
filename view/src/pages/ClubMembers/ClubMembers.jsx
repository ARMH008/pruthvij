import Coordinators from "./Coordinators";
import Hod from "./Hod";
import President from "./President";

function ClubMembers() {
  return (
    <div>
      <Hod />
      <Coordinators />
      <President />
    </div>
  );
}

export default ClubMembers;
