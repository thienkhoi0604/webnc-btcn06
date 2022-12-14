import classes from "./SlideProperties.module.css";
import { typeSlideData } from "../../mock/type-slide";
import Select from "react-select";
import { Divider, Input } from "antd";
import ResultLayout from "./ResultLayout/ResultLayout";
import Options from "./Options/Options";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_SERVER } from "../../constants";

const { TextArea } = Input;

const SlideProperties = (props) => {
  const [options, setOptions] = useState(null);
  const { slide } = props;

  const { isLoading, error } = useQuery({
    queryKey: [`repoOptions${slide.id}`],
    queryFn: async () => {
      const { data } = await axios.get(`${URL_SERVER}/option/${slide.id}`);
      setOptions(data);
      return data;
    },
  });

  useEffect(() => {
    const show = document.getElementById("longer-description");
    const addLongerDes = document.getElementById("add-longer-description");

    const showLongerDescription = () => {
      show.style.display = "inline";
      addLongerDes.style.display = "none";
    };

    if (show && addLongerDes) {
      addLongerDes.addEventListener("click", showLongerDescription);
    }

    return () => {
      if (show && addLongerDes) {
        show.style.display = "none";
        addLongerDes.style.display = "block";
        addLongerDes.removeEventListener("click", showLongerDescription);
      }
    };
  }, []);

  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={classes["type-slide"]}>
      <h4 className={classes["heading"]}>Slide type</h4>
      <Select
        options={typeSlideData}
        defaultOptions={typeSlideData}
        defaultValue={typeSlideData[0]}
        placeholder=""
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            width: "100%",
            height: "50px",
          }),
        }}
      />
      <Divider />
      <h4 className={classes["heading"]}>Your question</h4>
      <Input
        showCount
        maxLength={150}
        onChange={onChange}
        value={slide && slide.question}
        style={{
          height: "40px",
        }}
      />
      <div
        id="add-longer-description"
        className={classes["longer-description"]}
      >
        Add longer description
      </div>
      <span
        id="longer-description"
        className={classes["show-longer-description"]}
      >
        <div className={classes["text-longer-description"]}>
          Longer description shown in your audience's phones and if you hover
          the question while presenting.
        </div>
        <TextArea
          showCount
          maxLength={250}
          placeholder="Your description"
          value={slide && slide.question}
          style={{
            height: 85,
            resize: "none",
          }}
          onChange={onChange}
        />
      </span>
      {options && <Options options={options} />}
      <ResultLayout />
    </div>
  );
};

export default SlideProperties;
