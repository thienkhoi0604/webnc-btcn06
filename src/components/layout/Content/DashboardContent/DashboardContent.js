import classes from "./DashboardContent.module.css";
import { filterShowData, tableData } from "../../../../mock/dashboard";
import { Layout, Space, Row, Col, Button, Input, Table } from "antd";
import Select from "react-select";
import { RiPlayCircleLine } from "react-icons/ri";
import { RxDotsHorizontal } from "react-icons/rx";

const { Content } = Layout;
const { Search } = Input;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (firstName, secondName) =>
      firstName.name.localeCompare(secondName.name),
    render: (_) => {
      return (
        <Space direction="horizontal" className={classes["field-name"]}>
          <Col>
            <RiPlayCircleLine className={classes["icon-play"]} />
          </Col>
          <Col>
            <Row className={classes["name-slide"]}>Slide name</Row>
            <Row>
              <span className={classes["description"]}>descriptions</span>
              <span className={classes["description"]}>descriptions</span>
            </Row>
          </Col>
        </Space>
      );
    },
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
    sorter: (a, b) => a.owner - b.owner,
  },
  {
    title: "Modified",
    dataIndex: "modified",
    key: "modified",
    sorter: (firstModified, secondModified) =>
      firstModified.modified.localeCompare(secondModified.modified),
  },
  {
    title: "Created",
    key: "created",
    dataIndex: "created",
    sorter: (firestCreated, secondCreated) =>
      firestCreated.created.localeCompare(secondCreated.created),
  },
  {
    key: "setting",
    dataIndex: "setting",
    render: (_) => {
      return <RxDotsHorizontal />;
    },
  },
];

const DashboardContent = () => {
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("pagination", pagination);
    console.log("filter", filters);
    console.log("sorter", sorter);
    console.log("extra", extra);
  };
  const onSearch = (value) => console.log(value);

  return (
    <Content className={classes["container-content"]}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row>
          <h4 className={classes["title-heading"]}>My presentations</h4>
        </Row>
        <Row className={classes["container-control"]}>
          <Col flex={1}>
            <Button className={`${classes["btn-add"]} ${classes["primary"]}`}>
              + New presentation
            </Button>
            <Button
              className={`${classes["btn-new-folder"]} ${classes["grey"]}`}
            >
              + New folder
            </Button>
          </Col>
          <Col>
            <span className={classes["group-filter"]}>
              <Search
                placeholder="Type to search"
                allowClear
                size="large"
                onSearch={onSearch}
                className={classes["search-box"]}
              />
              <Select
                options={filterShowData}
                defaultValue={filterShowData[0]}
                menuPortalTarget={document.body}
                styles={{
                  control: (baseStyle) => ({
                    ...baseStyle,
                    height: "40px",
                    borderRadius: "5px",
                    width: "180px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }),
                  menuPortal: (baseStyle) => ({
                    ...baseStyle,
                    fontSize: "1.6rem",
                    zIndex: 9999,
                  }),
                  option: (baseStyle) => ({
                    ...baseStyle,
                    cursor: "pointer",
                  }),
                }}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Table
            rowSelection={{
              type: "checkbox",
            }}
            columns={columns}
            dataSource={tableData}
            style={{ width: "100%" }}
            onChange={onChange}
          />
          ;
        </Row>
      </Space>
    </Content>
  );
};

export default DashboardContent;
