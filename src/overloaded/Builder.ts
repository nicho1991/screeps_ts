import { MyCreep } from "./MyCreep";

class Builder extends MyCreep {
  constructor(id: Id<Creep>) {
    super(id);

    var roomEnergy = this.spawnRoom.energyAvailable;
    var roomEnergyCapacity = this.spawnRoom.energyCapacityAvailable;
    this.startBuild();

    if (roomEnergy === roomEnergyCapacity) {
      this.getResources();
    } else {
      this.mine();
    }
  }

  private startBuild = () => {
    if (!this.withEnergyState) return;

    var site = this.spawnRoom.find(FIND_MY_CONSTRUCTION_SITES)[0];
    if (site) {
      this.moveTo(site, { visualizePathStyle: { stroke: this.move_color } });
      this.build(site);
    }
  };
}

export { Builder };
