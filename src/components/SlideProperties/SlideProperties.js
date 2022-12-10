import classes from "./SlideProperties.module.css";
import { typeSlideData } from "../../mock/type-slide";
import AsyncSelect from "react-select/async";
import { Divider, Input } from "antd";
import ResultLayout from "./ResultLayout/ResultLayout";
import Options from "./Options/Options";
import { useEffect } from "react";

const filterTypeSlides = (inputValue) => {
  return typeSlideData.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseTypeSlides = (inputValue) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterTypeSlides(inputValue));
    }, 1000);
  });

const { TextArea } = Input;

const SlideProperties = () => {
  useEffect(() => {
    const show = document.getElementById("longer-description");
    const addLongerDes = document.getElementById("add-longer-description");

    const showLongerDescription = () => {
      show.style.display = "inline";
      addLongerDes.style.display = "none";
    };

    addLongerDes.addEventListener("click", showLongerDescription);

    return () => {
      show.style.display = "none";
      addLongerDes.style.display = "block";
      addLongerDes.removeEventListener("click", showLongerDescription);
    };
  }, []);

  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <div className={classes["type-slide"]}>
      <h4 className={classes["heading"]}>Slide type</h4>
      <AsyncSelect
        cacheOptions
        options={typeSlideData}
        defaultOptions={typeSlideData}
        loadOptions={promiseTypeSlides}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            width: "100%",
            height: "50px",
          }),
        }}
      />
      <Divider />
      <h4 className={classes["heading"]}>Your Question</h4>
      <Input
        showCount
        maxLength={150}
        onChange={onChange}
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
          style={{
            height: 85,
            resize: "none",
          }}
          onChange={onChange}
        />
      </span>
      <Options />
      <ResultLayout />
    </div>
  );
};

export default SlideProperties;
