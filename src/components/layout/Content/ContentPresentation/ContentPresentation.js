import classes from "./ContentPresentation.module.css";
import { BarChart, Bar, ResponsiveContainer, LabelList, XAxis } from "recharts";
import { Space, Row } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { URL_SERVER } from "../../../../constants";

const ContentPresentation = (props) => {
  const { slide } = props;
  const [chart, setChart] = useState(null);
  const { isLoading, error } = useQuery({
    queryKey: [`repoOptionsVote${slide.id}`],
    queryFn: async () => {
      const { data } = await axios.get(`${URL_SERVER}/option/${slide.id}`);
      setChart(data);
      return data;
    },
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Space
      direction="vertical"
      className={classes["container-content-presentation"]}
    >
      <div className={classes["link-member"]}>
        Go to <strong>www.menti.com</strong> and use the code 8149228
      </div>
      <h2 className={classes["heading"]}>{slide.question}</h2>
      <Row>
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart
            width={150}
            height={40}
            data={chart}
            margin={{ top: 30, right: 60, left: 30, bottom: 10 }}
          >
            <XAxis dataKey="value_option" />
            <Bar dataKey="vote" fill="#8884d8">
              <LabelList dataKey="vote" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Row>
    </Space>
  );
};

export default ContentPresentation;
