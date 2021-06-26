import { MyCreep } from "./MyCreep";

class Repairer extends MyCreep {
  constructor(id: Id<Creep>) {
    super(id);

    var roomEnergy = this.spawnRoom.energyAvailable;
    var roomEnergyCapacity = this.spawnRoom.energyCapacityAvailable;
    this.startRepair();

    if (roomEnergy === roomEnergyCapacity) {
      this.getResources();
    } else {
      this.mine();
    }
  }

  private startRepair = () => {
    if (!this.withEnergyState) return;

    var targets = this.room.find(FIND_MY_STRUCTURES, {
      filter: object => object.hits < object.hitsMax / 4
    });

    targets.sort((a, b) => a.hits - b.hits);

    var target = targets[0];
    if (targets.length > 0) {
      if (this.repair(target) == ERR_NOT_IN_RANGE) {
        this.moveTo(target, { visualizePathStyle: { stroke: this.move_color } });
      }
    }
  };
}

export { Repairer };
