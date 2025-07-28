import styles from "./Dashboard.module.css";

import { DashboardProps } from "./Dashboard.types";
import DashboardWidget from "./components/Widget/Widget";

const Dashboard = (props: DashboardProps) => {
  return (
    <div className={styles.container}>
      {props.widgets.map((widget, i) => (
        <DashboardWidget
          key={i}
          {...widget}
          filter={{}}
          data={props.data}
          previousData={props.previousData}
        />
      ))}
    </div>
  );
};

export default Dashboard;

export * from "./components/Widget/Widget.types";
export * from "./Dashboard.types";
