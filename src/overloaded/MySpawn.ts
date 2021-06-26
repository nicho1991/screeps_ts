import { ROLES } from "../constants";
import { Builder } from "./Builder";
import { Hauler } from "./Hauler";
import { Miner } from "./Miner";
import { Repairer } from "./Repairer";
import { StaticMiner } from "./StaticMiner";
import { Upgrader } from "./Upgrader";

// TODO remove temps and make more dynamic
class MySpawn extends Spawn {
  private roomMiners: Miner[];
  private roomUpgraders: Upgrader[];
  private roomBuilders: Builder[];
  private roomRepairers: Repairer[];
  private roomStaticMiners: StaticMiner[];
  private roomHaulers: Hauler[];

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

  private tempStaticMinerEnergyRequirement = 300;
  private tempStaticMinerAttributes = [WORK, WORK, CARRY, MOVE];

  private tempHaulersAmount = 1;
  private tempHaulersEnergyRequirement = 300;
  private tempHaulerAttributes = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];

  private needMiners = true;

  constructor(
    id: Id<StructureSpawn>,
    miners: Miner[],
    upgraders: Upgrader[],
    builders: Builder[],
    repairers: Repairer[],
    staticMiners: StaticMiner[],
    haulers: Hauler[]
  ) {
    super(id);
    this.roomMiners = [];
    this.roomUpgraders = [];
    this.roomBuilders = [];
    this.roomRepairers = [];
    this.roomStaticMiners = [];
    this.roomHaulers = [];
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

    staticMiners.forEach(sminer => {
      if (sminer.memory.room === this.room.name) this.roomStaticMiners.push(sminer);
    });

    haulers.forEach(hauler => {
      if (hauler.memory.room === this.room.name) this.roomHaulers.push(hauler);
    });

    if (haulers.length > 0 && staticMiners.length > 0) {
      this.needMiners = false;
    }

    if (this.needMiners) this.spawnMiners();
    this.spawnUpgraders();
    this.spawnBuilders();
    this.spawnRepairers();
    this.spawnStaticMiners();
    this.spawnHaulers();
  }

  private spawnHaulers = () => {
    if (
      this.roomStaticMiners.length > 1 &&
      this.roomHaulers.length < this.tempHaulersAmount &&
      this.room.energyAvailable >= this.tempHaulersEnergyRequirement
    ) {
      var uniqueIdNumber = Game.time.toString();

      console.log("spawning hauler: " + uniqueIdNumber + " in room: " + this.room.name);
      var message = this.spawnCreep(this.tempHaulerAttributes, "Hauler" + uniqueIdNumber, {
        memory: { role: ROLES.HAULER, room: this.room.name, withEnergyState: false }
      });
      console.log(message);
    }
  };

  private spawnStaticMiners = () => {
    var containers = this.room.find(FIND_STRUCTURES).filter(s => s.structureType === STRUCTURE_CONTAINER);
    var staticMinerContainerIds = this.roomStaticMiners.map(x => x.memory.containerId);

    // where not
    var availableContainers = containers.filter(x => staticMinerContainerIds.indexOf(x.id) == -1);
    if (availableContainers.length > 0) {
      if (this.room.energyAvailable >= this.tempStaticMinerEnergyRequirement) {
        var uniqueIdNumber = Game.time.toString();

        console.log("spawning static miner: " + uniqueIdNumber + " in room: " + this.room.name);
        var message = this.spawnCreep(this.tempStaticMinerAttributes, "StaticMiner" + uniqueIdNumber, {
          memory: { role: ROLES.STATIC_MINER, room: this.room.name, withEnergyState: false }
        });
        console.log(message);
      }
    }
  };

  private spawnRepairers = () => {
    if (this.roomMiners.length > 0 || !this.needMiners)
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
    if (this.roomMiners.length > 0 || !this.needMiners)
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
    if (this.roomMiners.length > 0 || !this.needMiners)
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
