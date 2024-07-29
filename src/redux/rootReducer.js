import userMaster from "./userSlices";
import javascriptMaster from "../pages/admin/interview/javascript/store/index";
import reactMaster from "../pages/admin/interview/react/store/index";
import nextMaster from "../pages/admin/interview/nextjs/store/index";
import typeMaster from "../pages/admin/interview/typescript/store/index";
const rootReducer = {
  userMaster,
  javascriptMaster,
  reactMaster,
  nextMaster,
  typeMaster,
};

export default rootReducer;
