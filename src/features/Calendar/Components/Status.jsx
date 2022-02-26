import React from "react";

export default function Status() {
  return (
    <div className="status">
      <div className="status__detail">
        <div>
          <span className="dot" style={{ backgroundColor: "#7FC128" }} /> Đã xác
          nhận
        </div>
        <div>
          <span className="dot" style={{ backgroundColor: "#0FAFF6" }} />
          Chưa xác nhận
        </div>
        <div>
          <span className="dot" style={{ backgroundColor: "#7161BA" }} />
          Hoàn thành
        </div>
        <div>
          <span className="dot" style={{ backgroundColor: "#EE6955" }} />
          Hủy
        </div>
      </div>
    </div>
  );
}
