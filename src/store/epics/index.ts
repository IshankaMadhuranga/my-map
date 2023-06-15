import { combineEpics } from "redux-observable";
import predictionsEpic from "./predictionsEpic";
import locationDetailsEpic from "./locationDetailsEpic";

const rootEpic = combineEpics(predictionsEpic, locationDetailsEpic);

export default rootEpic;
