import { ROLES } from "../constants";
import { Miner } from "./Miner";
import { Upgrader } from "./Upgrader";

// TODO remove temps and make more dynamic
class MySpawn extends Spawn {
  private roomMiners: Miner[];
  private tempMinersAmount = 2;
  private tempMinerEnergyRequirement = 300;
  private tempMinerAttributes = [WORK, CARRY, CARRY, MOVE, MOVE];

  private roomUpgraders: Upgrader[];
  private tempUpgradersAmount = 1;
  private tempUpgraderEnergyRequirement = 300;
  private tempUpgradersAttributes = [WORK, WORK, CARRY, MOVE];
  constructor(id: Id<StructureSpawn>, miners: Miner[], upgraders: Upgrader[]) {
    super(id);
    this.roomMiners = [];
    this.roomUpgraders = [];
    miners.forEach(miner => {
      if (miner.memory.room === this.room.name) this.roomMiners.push(miner);
    });

    upgraders.forEach(upgrader => {
      if (upgrader.memory.room === this.room.name) this.roomUpgraders.push(upgrader);
    });
    this.spawnMiners();
    this.spawnUpgraders();
  }

  private spawnUpgraders = () => {
    if (this.roomMiners.length > 0)
      if (
        this.roomUpgraders.length < this.tempUpgradersAmount &&
        this.room.energyAvailable >= this.tempUpgraderEnergyRequirement
      ) {
        var uniqueIdNumber = Game.time.toString();

        console.log("spawning upgrader: " + uniqueIdNumber + " in room: " + this.room.name);
        var message = this.spawnCreep(this.tempUpgradersAttributes, "Upgrader" + uniqueIdNumber, {
          memory: { role: ROLES.UPGRADER, room: this.room.name, withEnergyState: false }
        });
        console.log(message);
      }
  };

  private spawnMiners = () => {
    if (
      this.roomMiners.length < this.tempMinersAmount &&
      this.room.energyAvailable >= this.tempMinerEnergyRequirement
    ) {
      var uniqueIdNumber = Game.time.toString();

      console.log("spawning miner: " + uniqueIdNumber + " in room: " + this.room.name);
      var message = this.spawnCreep(this.tempMinerAttributes, "Miner" + uniqueIdNumber, {
        memory: { role: ROLES.MINER, room: this.room.name, withEnergyState: false }
      });
      console.log(message);
    }
  };
}

export { MySpawn };
