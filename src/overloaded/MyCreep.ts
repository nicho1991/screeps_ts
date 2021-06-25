class MyCreep extends Creep {
  public spawnRoom: Room;
  public move_color = "#ffaa00";
  public hostiles: Creep[];
  public working: boolean;
  constructor(id: Id<Creep>) {
    super(id);
    this.spawnRoom = Game.rooms[this.memory.room];
    this.hostiles = this.room.find(FIND_HOSTILE_CREEPS);
    this.working = this.memory.working;
  }
}

export { MyCreep };
