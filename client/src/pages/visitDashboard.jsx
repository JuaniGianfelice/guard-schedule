import ScheduleGuard from "../components/schedule/scheduleGuard";
import ScheduleUti from "../components/schedule/scheduleUti";


const VisitDashboard = () => {
  return (
    <div className="user-dashboard">
      <ScheduleUti />
      <ScheduleGuard />
    </div>
  );
}

export default VisitDashboard