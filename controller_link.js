var utils = require("_utils");

var RANGE_TO_SOURCE = 4;

function LinkController(room) {
    this.room = room;
    this.links = room.getLinks();
}


utils.extend(LinkController.prototype, {
    
    getSenders: function() {
        var sources = this.room.sources();
        return _.filter(this.links, function(link) {
            for (var s in sources) {
                if (link.pos.inRangeTo(sources[s], RANGE_TO_SOURCE)) {
                    return true;
                }
            }
            return false;
        })
    },

    getReceivers: function() {
        var sources = this.room.sources();
        return _.filter(this.links, function(link) {
            for (var s in sources) {
                if (!link.pos.inRangeTo(sources[s], RANGE_TO_SOURCE)) {
                    return true;
                }
            }
        });
    },

    transfer : function() {
        var senders = this.getSenders();
        var receiver = _.find(this.getReceivers(), function(r) {
            return (r.energy < r.energyCapacity - 100);
        });

        if (receiver != null) {
            for (var s in senders) {
                var sender = senders[s];
                if (sender.cooldown == 0 && sender.energy == sender.energyCapacity) {
                    sender.transferEnergy(receiver);
                }
            }
        }
    }

});

module.exports = LinkController;