import { MyCreep } from "./MyCreep";

class StaticMiner extends MyCreep {
  constructor(id: Id<Creep>) {
    super(id);
    this.startMineStatic();
  }

  private startMineStatic = () => {
    var myContainer = this.spawnRoom
      .find(FIND_STRUCTURES)
      .filter(x => x.structureType === STRUCTURE_CONTAINER)
      .find(s => s.id === this.memory.containerId);
    var sourceAtContainer = this.pos.findClosestByPath(this.spawnRoom.find(FIND_SOURCES));

    if (myContainer && sourceAtContainer) {
      if (this.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
        this.transfer(myContainer, RESOURCE_ENERGY);
      }
      this.moveTo(myContainer, { visualizePathStyle: { stroke: this.move_color } });
      if (this.pos.isNearTo(sourceAtContainer)) this.harvest(sourceAtContainer);
    }
  };
}

export { StaticMiner };
