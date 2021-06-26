import { ROLES } from "../constants";
import { Builder } from "./Builder";
import { Miner } from "./Miner";
import { Repairer } from "./Repairer";
import { Upgrader } from "./Upgrader";

// TODO remove temps and make more dynamic
class MySpawn extends Spawn {
  private roomMiners: Miner[];
  private roomUpgraders: Upgrader[];
  private roomBuilders: Builder[];
  private roomRepairers: Repairer[];

  private tempMinersAmount = 2;
  private tempMinerEnergyRequirement = 300;
  private tempMinerAttributes = [WORK, CARRY, CARRY, MOVE, MOVE];

  private tempUpgradersAmount = 1;
  private tempUpgraderEnergyRequirement = 300;
  private tempUpgradersAttributes = [WORK, WORK, CARRY, MOVE];

  private tempBuildersAmount = 1;
  private tempBuildersEnergyRequirement = 300;
  private tempBuildersAttributes = [WORK, WORK, CARRY, MOVE];

  private tempRepairersAmount = 1;
  private tempRepairerEnergyRequirement = 300;
  private tempRepairerAttributes = [WORK, WORK, CARRY, MOVE];

  constructor(
    id: Id<StructureSpawn>,
    miners: Miner[],
    upgraders: Upgrader[],
    builders: Builder[],
    repairers: Repairer[]
  ) {
    super(id);
    this.roomMiners = [];
    this.roomUpgraders = [];
    this.roomBuilders = [];
    this.roomRepairers = [];
    miners.forEach(miner => {
      if (miner.memory.room === this.room.name) this.roomMiners.push(miner);
    });

    upgraders.forEach(upgrader => {
      if (upgrader.memory.room === this.room.name) this.roomUpgraders.push(upgrader);
    });

    builders.forEach(builder => {
      if (builder.memory.room === this.room.name) this.roomBuilders.push(builder);
    });

    repairers.forEach(repairer => {
      if (repairer.memory.room === this.room.name) this.roomRepairers.push(repairer);
    });
    this.spawnMiners();
    this.spawnUpgraders();
    this.spawnBuilders();
    this.spawnRepairers();
  }
  private spawnRepairers = () => {
    if (this.roomMiners.length > 0)
      if (
        this.roomRepairers.length < this.tempRepairersAmount &&
        this.room.energyAvailable >= this.tempRepairerEnergyRequirement
      ) {
        var uniqueIdNumber = Game.time.toString();

        console.log("spawning repairer: " + uniqueIdNumber + " in room: " + this.room.name);
        var message = this.spawnCreep(this.tempRepairerAttributes, "Repairer" + uniqueIdNumber, {
          memory: { role: ROLES.REPAIRER, room: this.room.name, withEnergyState: false }
        });
        console.log(message);
      }
  };

  private spawnBuilders = () => {
    if (this.roomMiners.length > 0)
      if (
        this.roomBuilders.length < this.tempBuildersAmount &&
        this.room.energyAvailable >= this.tempBuildersEnergyRequirement
      ) {
        var uniqueIdNumber = Game.time.toString();

        console.log("spawning builder: " + uniqueIdNumber + " in room: " + this.room.name);
        var message = this.spawnCreep(this.tempBuildersAttributes, "Builder" + uniqueIdNumber, {
          memory: { role: ROLES.BUILDER, room: this.room.name, withEnergyState: false }
        });
        console.log(message);
      }
  };

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
    // miner needs: work, carry, move.
    // 5 work keeps resource down

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
