import classes from "./ContentPresentation.module.css";
import { BarChart, Bar, ResponsiveContainer, LabelList, XAxis } from "recharts";
import { Space, Row } from "antd";
import { chartData } from "../../../../mock/chart";

const ContentPresentation = () => {
  return (
    <Space
      direction="vertical"
      className={classes["container-content-presentation"]}
    >
      <div className={classes["link-member"]}>
        Go to <strong>www.menti.com</strong> and use the code 8149228
      </div>
      <h2 className={classes["heading"]}>Multiple Choice</h2>
      <Row>
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart
            width={150}
            height={40}
            data={chartData}
            margin={{ top: 30, right: 60, left: 30, bottom: 10 }}
          >
            <XAxis dataKey="name" />
            <Bar dataKey="pv" fill="#8884d8">
              <LabelList dataKey="name" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Row>
    </Space>
  );
};

export default ContentPresentation;
