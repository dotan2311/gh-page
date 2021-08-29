import common from "./common.json";
import management from "./management.json";
import header from "./header.json";


const vnMessenger = {
    ...common,
    ...management,
    ...header,
};
export default vnMessenger;
