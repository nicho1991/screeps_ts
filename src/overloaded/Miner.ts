import { MyCreep } from "./MyCreep";

class Miner extends MyCreep {
  private closestSource: Source | null;
  private hostilesCloseToSource: boolean;

  constructor(id: Id<Creep>) {
    super(id);
    this.closestSource = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    this.hostilesCloseToSource = false;
    this.hostiles.forEach(h => {
      if (this.closestSource) if (h.pos.isNearTo(this.closestSource)) this.hostilesCloseToSource = true;
    });

    if (this.store.getUsedCapacity() === 0) {
      this.working = true;
    } else if (this.store.getUsedCapacity() === this.store.getCapacity()) {
      this.working = false;
    }
    this.mine();
    this.deliver();
  }

  private mine = () => {
    if (this.hostilesCloseToSource) return;
    if (!this.working) return;
    if (this.closestSource) {
      this.moveTo(this.closestSource, { visualizePathStyle: { stroke: this.move_color } });
      if (this.pos.isNearTo(this.closestSource)) this.harvest(this.closestSource);
    }
  };

  private deliver = () => {
    if (this.working) return;
    var roomEnergy = this.spawnRoom.energyAvailable;
    var roomEnergyCapacity = this.spawnRoom.energyCapacityAvailable;
    var controller = this.spawnRoom.controller;
    if (roomEnergy === roomEnergyCapacity) {
      if (controller) {
        this.moveTo(controller, { visualizePathStyle: { stroke: this.move_color } });
        this.upgradeController(controller);
      }
    } else {
      var spawn = this.pos.findClosestByPath(FIND_MY_SPAWNS);
      if (spawn)
        if (this.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.moveTo(spawn, { visualizePathStyle: { stroke: this.move_color } });
        }
    }
  };
}

export { Miner };
