import { MyCreep } from "./MyCreep";

class Upgrader extends MyCreep {
  private controller: StructureController | undefined;
  constructor(id: Id<Creep>) {
    super(id);

    var roomEnergy = this.spawnRoom.energyAvailable;
    var roomEnergyCapacity = this.spawnRoom.energyCapacityAvailable;
    this.controller = this.spawnRoom.controller;
    this.upgrade();

    if (roomEnergy === roomEnergyCapacity) {
      this.getResources();
    } else {
      this.mine();
    }
  }
  private getResources = () => {
    if (this.withEnergyState) return;
    const energies = this.spawnRoom
      .find(FIND_MY_STRUCTURES)
      .filter(x => x.structureType === STRUCTURE_EXTENSION || x.structureType === STRUCTURE_SPAWN)
      .filter(x => {
        x = x as StructureSpawn;
        return x.store?.getFreeCapacity(RESOURCE_ENERGY) === 0;
      });

    var source = energies[0] as StructureSpawn;
    var result = this.withdraw(source, RESOURCE_ENERGY);

    if (result == ERR_NOT_IN_RANGE) {
      this.moveTo(energies[0]);
    }
  };
  private upgrade = () => {
    if (!this.withEnergyState) return;

    if (this.controller) {
      this.moveTo(this.controller, { visualizePathStyle: { stroke: this.move_color } });
      this.upgradeController(this.controller);
    }
  };
}

export { Upgrader };
