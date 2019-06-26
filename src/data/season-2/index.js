import Chris from "./chris";
import Matty from "./matty";
import Simon from "./simon";
import Peter from "./peter";

import AiDrivers from './ai';

import teams from "./teams";

import grandPrix from './grand-prix';

export default {
  grandPrix,
  teams,
  drivers: AiDrivers.concat([Chris, Matty, Simon, Peter])
};
