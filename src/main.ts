import { Miner } from "overloaded/Miner";
import { ErrorMapper } from "utils/ErrorMapper";
import { MySpawn } from "overloaded/MySpawn";
import { ROLES } from "./constants";
import { Upgrader } from "overloaded/Upgrader";
import { Builder } from "overloaded/Builder";
import { Repairer } from "overloaded/Repairer";
import { StaticMiner } from "overloaded/StaticMiner";
import { Hauler } from "overloaded/Hauler";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    withEnergyState: boolean;
    containerId?: string;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

export const loop = ErrorMapper.wrapLoop(() => {
  var miners = [] as Miner[];
  var upgraders = [] as Upgrader[];
  var builders = [] as Builder[];
  var repairers = [] as Repairer[];
  var staticMiners = [] as StaticMiner[];
  var haulers = [] as Hauler[];
  // console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    const role = creep.memory.role;
    if (role === ROLES.MINER) miners.push(new Miner(Game.creeps[name].id));
    if (role === ROLES.UPGRADER) upgraders.push(new Upgrader(Game.creeps[name].id));
    if (role === ROLES.BUILDER) builders.push(new Builder(Game.creeps[name].id));
    if (role === ROLES.REPAIRER) repairers.push(new Repairer(Game.creeps[name].id));
    if (role === ROLES.STATIC_MINER) staticMiners.push(new StaticMiner(Game.creeps[name].id));
    if (role === ROLES.HAULER) haulers.push(new Hauler(Game.creeps[name].id));
  }

  for (const name in Game.rooms) {
    const room = Game.rooms[name];
    var spawns = room.find(FIND_MY_SPAWNS);
    spawns.forEach(spawn => {
      new MySpawn(spawn.id, miners, upgraders, builders, repairers, staticMiners, haulers);
    });
  }
});
