import { MyCreep } from "./MyCreep";

class Hauler extends MyCreep {
  constructor(id: Id<Creep>) {
    super(id);

    this.startHaul();
    this.deliverResources();
  }

  private startHaul = () => {
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

export { Hauler };
