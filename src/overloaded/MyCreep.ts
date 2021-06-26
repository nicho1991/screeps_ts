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
}

export { MyCreep };
