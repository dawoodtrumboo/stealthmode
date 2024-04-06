// Sidebar.tsx
import { HomeFilled } from "@ant-design/icons";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const Sidebar = () => {
  return (
    <nav className="w-[23vw] min-h-screen px-6">
      <div className="px-8">
        <div>
          <h2 className="text-gray-900 text-lg font-semibold py-4">
            Hi, AltWorld
          </h2>

          <div style={{ width: "100%", height: "1px", position: "relative" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(to right, rgba(200, 200, 200, 0) 0%, rgba(200, 200, 200, 1) 50%, rgba(200, 200, 200, 0) 100%)",
              }}
            ></div>
          </div>
        </div>
        <ul className="mt-4">
          <li>
            <a
              href="/"
              className="font-semibold text-gray-900 flex items-center gap-2"
            >
              <HomeFilled className="bg-white p-2 rounded-xl text-[#5BD1C6]" />
              <span> Dashboard</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="w-full mt-10 h-[200px] bg-[#5BD1C6] rounded-xl flex flex-col gap-5 p-4">
        <div className="bg-white flex items-center justify-center w-[30px] h-[30px] rounded-xl">
          <PlusOutlined style={{ color: "grey" }} />
        </div>
        <div className="space-y-2 w-full ">
          <h4 className="text-md font-semibold text-white">New Assignments?</h4>
          <p className="text-xs text-white">
            Select from pre-defined questions to have a quick turnaround
          </p>
          <Button
            type="primary"
            shape="round"
            style={{
              background: "#fff",
              color: "black",
              fontSize: "14px",
              fontWeight: "600",
              height: "40px",
              width: "100%",
              borderRadius: "10px",
            }}
            size={"small"}
          >
            Create New Assignment
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
