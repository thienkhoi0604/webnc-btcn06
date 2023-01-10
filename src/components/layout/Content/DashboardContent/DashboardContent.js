import classes from "./DashboardContent.module.css";
import { filterShowData } from "../../../../mock/dashboard";
import { Layout, Space, Row, Col, Button, Input, Table, Dropdown } from "antd";
import Select from "react-select";
import { RiPlayCircleLine } from "react-icons/ri";
import { RxDotsHorizontal } from "react-icons/rx";
import { Link } from "react-router-dom";
// import axios from "axios";
// import { URL_SERVER } from "../../../../constants";

const { Content } = Layout;
const { Search } = Input;

const items = [
  {
    key: "1",
    label: <div>Edit</div>,
  },
  {
    key: "2",
    label: <div>Delete</div>,
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name_pre",
    key: "name_pre",
    sorter: (firstName, secondName) =>
      firstName.name.localeCompare(secondName.name),
    render: (_, record) => {
      return (
        <Space direction="horizontal" className={classes["field-name"]}>
          <Col>
            <RiPlayCircleLine className={classes["icon-play"]} />
          </Col>
          <Col>
            <Row className={classes["name-slide"]}>
              <Link to={`/my-presentation/${record.id}`}>
                {record.name_pre}
              </Link>
            </Row>
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
    dataIndex: "owner_pre",
    key: "owner_pre",
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
      return (
        <>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            placement="bottom"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <RxDotsHorizontal className={classes["setting-icon"]} />
          </Dropdown>
        </>
      );
    },
  },
];

const DashboardContent = (props) => {
  const { presentationsData, onShowModal } = props;
  const onSearch = (value) => console.log(value);

  return (
    <Content className={classes["container-content"]}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row>
          <h4 className={classes["title-heading"]}>My presentations</h4>
        </Row>
        <Row className={classes["container-control"]}>
          <Col flex={1}>
            <Button
              className={`${classes["btn-add"]} ${classes["primary"]}`}
              onClick={onShowModal}
            >
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
            dataSource={presentationsData}
            style={{ width: "100%" }}
          />
        </Row>
      </Space>
    </Content>
  );
};

export default DashboardContent;
