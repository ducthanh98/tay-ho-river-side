import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingService } from "../services/loadingService";

const styles = {
  background: {
    position: "absolute",
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    opacity: "0.6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999
  }
};

const Loading = () => {
  const [isLoading, setLoading] = useState(LoadingService.get());

  useEffect(() => {
    //TODO: phần này e k cần sửa, nhưng cần để ý 1 chút chỗ này,
    // ví dụ khi click vào button submit sẽ chỉ hiển thị loading của button đó, nếu như muốn dùng chung component loading này
    // thì sẽ dẫn đến chỉ có service cuối cùng được gọi do cái "key" đang k unique, mà bị compoent sau khi đè component trước
    LoadingService.onChange("loading", () => {
      setLoading(LoadingService.get());
    });

    return () => {
      LoadingService.deleteKey("loading");
    };
  }, []);
  //tránh sử dụng ternary operator trong lúc render
  //nên sử dụng if() để clear code hơn
  // return (
  //     <>
  //         {
  //             isLoading &&
  //         }
  //     </>
  // );
  if (isLoading) {
    return (
      <div style={styles.background}>
        <Spin size="large" />
      </div>
    );
  }
  return null;
};

export default Loading;
