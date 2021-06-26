class MyCreep extends Creep {
  public spawnRoom: Room;
  public move_color = "#ffaa00";
  public hostiles: Creep[];
  public withEnergyState: boolean;
  constructor(id: Id<Creep>) {
    super(id);
    this.spawnRoom = Game.rooms[this.memory.room];
    this.hostiles = this.room.find(FIND_HOSTILE_CREEPS);
    this.withEnergyState = this.memory.withEnergyState;

    if (this.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
      this.memory.withEnergyState = false;
    } else if (this.store.getUsedCapacity(RESOURCE_ENERGY) === this.store.getCapacity(RESOURCE_ENERGY)) {
      this.memory.withEnergyState = true;
    }
  }

  public mine = () => {
    var closestSource = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    var hostilesCloseToSource = false;
    this.hostiles.forEach(h => {
      if (closestSource) if (h.pos.isNearTo(closestSource)) hostilesCloseToSource = true;
    });

    if (hostilesCloseToSource) return;
    if (this.withEnergyState) return;
    if (closestSource) {
      this.moveTo(closestSource, { visualizePathStyle: { stroke: this.move_color } });
      if (this.pos.isNearTo(closestSource)) this.harvest(closestSource);
    }
  };

  public getResources = () => {
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
}

export { MyCreep };
