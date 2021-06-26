import { MyCreep } from "./MyCreep";

class Miner extends MyCreep {
  constructor(id: Id<Creep>) {
    super(id);
    this.mine();
    this.deliverResources();
  }
}

export { Miner };
