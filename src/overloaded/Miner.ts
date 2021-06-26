import { MyCreep } from "./MyCreep";

class Miner extends MyCreep {
  constructor(id: Id<Creep>) {
    super(id);
    this.mine();
    this.deliver();
  }

  private deliver = () => {
    if (!this.withEnergyState) return;

    var spawn = this.pos.findClosestByPath(FIND_MY_SPAWNS);
    if (spawn)
      if (this.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(spawn, { visualizePathStyle: { stroke: this.move_color } });
      }
  };
}

export { Miner };
