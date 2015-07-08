var _jobs = {};

function addJob(name, options) {
    var defaults = {
        work : function() {creep, target},
        complete : function(creep, target) { return true; },
        target : function(creep) { return null; }
    };
    
    if (options) {
        _jobs[name] = _.extend(defaults, options);
    }
}


// ## HARVEST ------------------------------------------------------------------
addJob("HARVEST", {
    work: function(creep, target) {
        if ( target ) {
            if ( creep.harvest(target) != OK ) {
                creep.moveTo(target);
            }
        }
    },
    complete: function(creep, target) {
        if (creep.hasActiveBodyParts(CARRY) == 0) {
            return false;
        }
        return (creep.energy == creep.energyCapacity);
    },
    target : function(creep) {
        return _.find(creep.room.getSources(), function(s) {
            return (_.filter(creep.room.getCreeps(), function(c) {
                return ( c.getTarget() === s );
            }).lengh < 2);
        });
    }
});


// ## PICKUP_ENERGY ------------------------------------------------------------
addJob("PICKUP_ENERGY", {
    work : function(creep) {
        
    },
    complete : function(creep) {
        return (creep.energy == creep.energyCapacity);
    }
});


// ## TRANSFER_SPAWN -----------------------------------------------------------
addJob("TRANSFER_SPAWN", {
    work : function(creep) {
        
    },
    complete : function(creep) {
        return (creep.energy == 0);
    }
});


// ## TRANSFER_UPGRADER --------------------------------------------------------
addJob("TRANSFER_UPGRADER",{
    work : function(creep) {
        
    },
    complete : function(creep) {
        return (creep.energy == 0);
    },
});


// ## TRANSFER_EXTENSION -------------------------------------------------------
addJob("TRANSFER_EXTENSION", {
    work : function(creep) {
        
    },
    complete : function(creep) {
        
    }
});


// ## TRANSFER_LINK ------------------------------------------------------------
addJob("TRANSFER_LINK", {
    work : function(creep) {
        
    },
    complete : function(creep) {
        
    }
});


// ## BUILD_STRUCTURE ----------------------------------------------------------
addJob("BUILD_STRUCTURE", {
    work : function(creep) {
        
    },
    complete : function(creep) {
        
    }
});


// ## REPAIR_STRUCTURE ---------------------------------------------------------
addJob("REPAIR_STRUCTURE", {
    work : function(creep) {
        
    },
    complete : function(creep) {
        
    }
});


// ## UPGRADE_CONTROLLER -------------------------------------------------------
addJob("UPGRADE_CONTROLLER", {
    work : function(creep) {
        
    },
    complete : function(creep) {
        
    }
});



var JobManager = {

    process: function(creep, jobs) {
        if (creep.fatigue > 0) return;

        var job = creep.getJob();

        // if creep has no job or job is completed -> find new job
        if (!job || job.completed()) {

        }

        // if job found -> send creep to work
        if (job) {
            creep.setJob(job);
            job.work(creep);
        }
    }

};


module.exports = _jobs;