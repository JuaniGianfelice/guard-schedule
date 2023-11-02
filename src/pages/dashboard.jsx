import Schedule from "../components/schedule/schedule";
import Topbar from "../components/topbar/Topbar";


const Dashboard = () => {
    return (
      <div className="dashboard">
        <Topbar/>
        <Schedule/>
      </div>
    );
  }
  
  export default Dashboard