const HARVESTER = "harvester";
const HARVESTER_MOVE_COLOR = "#ffaa00";
const HARVESTER_PER_SOURCE = 1;
const HARVESTER_SPAWN_ENERGY_REQUIREMENT = 300;
const HARVESTER_ATTRIBUTES = [WORK, CARRY, CARRY, MOVE, MOVE];

var MyRooms = () => {
  var RoomList = [];
  for (var roomName in Game.rooms) {
    if (Game.rooms[roomName]) {
      RoomList.push(Game.rooms[roomName]);
    }
  }
  return RoomList;
};

var GetMyHarvesters = (myCreepsInRoom: Creep[]): Creep[] => {
  var CreepList = [];
  for (var creepname in myCreepsInRoom) {
    if (myCreepsInRoom[creepname].memory.role === HARVESTER) {
      CreepList.push(myCreepsInRoom[creepname]);
    }
  }
  return CreepList;
};

var SpawnHarvesters = (harvesters: Creep[], spawn: StructureSpawn, roomSources: Source[], room: Room) => {
  if (
    harvesters.length < roomSources.length * HARVESTER_PER_SOURCE &&
    spawn.room.energyAvailable > HARVESTER_SPAWN_ENERGY_REQUIREMENT
  ) {
    var havesterNumber = harvesters.length;
    var uniqueIdNumber = Game.time.toString();

    console.log("spawning harvester: " + uniqueIdNumber + " in room: " + spawn.room.name);
    var message = spawn.spawnCreep(HARVESTER_ATTRIBUTES, "Harvester" + uniqueIdNumber, {
      memory: { role: HARVESTER, room: room.name, working: true }
    });
    console.log(message);
  }
};

var MoveToSource = (creep: Creep, spawn: StructureSpawn) => {
  var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
  if (source === null) return;
  var hostiles = creep.room.find(FIND_HOSTILE_CREEPS)[0];
  if (hostiles && hostiles.pos.isNearTo(source)) {
    console.log("Creep " + creep.name + " source is near hostile.. waiting");
  } else if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source, { visualizePathStyle: { stroke: HARVESTER_MOVE_COLOR } });
  }
};

var DeliverSources = (creep: Creep, spawn: StructureSpawn, room: Room) => {
  var roomEnergy = room.energyAvailable;
  var roomEnergyCapacity = room.energyCapacityAvailable;
  var controller = room.controller;
  if (roomEnergy === roomEnergyCapacity && room.controller !== undefined) {
    controller = controller as StructureController;
    creep.moveTo(controller, { visualizePathStyle: { stroke: HARVESTER_MOVE_COLOR } });
    creep.upgradeController(controller);
  } else {
    if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn, { visualizePathStyle: { stroke: HARVESTER_MOVE_COLOR } });
    }
  }
};

// could need an upgrade to find closests spawn
var HarvestersFarm = (harvesters: Creep[], spawn: StructureSpawn, room: Room) => {
  harvesters.forEach(creep => {
    if (creep.store.getFreeCapacity() > 0) {
      MoveToSource(creep, spawn);
    } else {
      DeliverSources(creep, spawn, room);
    }
  });
};

var ManageHarvesters = () => {
  var rooms = MyRooms();
  rooms.forEach(room => {
    var roomSources = room.find(FIND_SOURCES);
    var myCreepsInRoom = room.find(FIND_MY_CREEPS);
    var harvesters = GetMyHarvesters(myCreepsInRoom);
    var mySpawns = room.find(FIND_MY_SPAWNS);
    SpawnHarvesters(harvesters, mySpawns[0], roomSources, room);
    HarvestersFarm(harvesters, mySpawns[0], room);
  });
};

export { ManageHarvesters };
