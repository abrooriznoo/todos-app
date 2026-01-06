import { message } from "antd";

message.config({
  duration: 2,
  maxCount: 3,
});

export const toast = {
  success: (text) => message.success(text),
  error: (text) => message.error(text),
  warning: (text) => message.warning(text),
};
