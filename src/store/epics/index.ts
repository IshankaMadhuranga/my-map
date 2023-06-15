import { combineEpics } from "redux-observable";
import fetchDataEpic from "./locationEpic";

const rootEpic = combineEpics(fetchDataEpic);

export default rootEpic;
