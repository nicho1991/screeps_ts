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

  private upgrade = () => {
    if (!this.withEnergyState) return;

    if (this.controller) {
      this.moveTo(this.controller, { visualizePathStyle: { stroke: this.move_color } });
      this.upgradeController(this.controller);
    }
  };
}

export { Upgrader };
