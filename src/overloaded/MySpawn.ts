import { ROLES } from "../constants";
import { Miner } from "./Miner";

class MySpawn extends Spawn {
  private roomMiners: Miner[];
  private tempMinersAmount = 2;
  private tempEnergyRequirement = 300;
  private tempMinerAttributes = [WORK, CARRY, CARRY, MOVE, MOVE];
  private minerRole = "miner";
  constructor(id: Id<StructureSpawn>, miners: Miner[]) {
    super(id);
    this.roomMiners = [];
    miners.forEach(miner => {
      if (miner.memory.room === this.room.name) this.roomMiners.push(miner);
    });
    this.SpawnHarvesters();
  }

  private SpawnHarvesters = () => {
    if (this.roomMiners.length < this.tempMinersAmount && this.room.energyAvailable >= this.tempEnergyRequirement) {
      var uniqueIdNumber = Game.time.toString();

      console.log("spawning miner: " + uniqueIdNumber + " in room: " + this.room.name);
      var message = this.spawnCreep(this.tempMinerAttributes, "Harvester" + uniqueIdNumber, {
        memory: { role: ROLES.MINER, room: this.name, working: true }
      });
      console.log(message);
    }
  };
}

export { MySpawn };
