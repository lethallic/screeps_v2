var utils = require("_utils");

function LinkController(room) {
    this.room = room;
    this.links = room.getLinks();
}


utils.extend(LinkController.prototype, {
    
    getSenders: function() {
        var sources = this.room.sources();
        return _.filter(this.links, function(link) {
            for (var s in sources) {
                if (link.pos.inRangeTo(sources[s], 5)) {
                    return true;
                }
            }
            return false;
        })
    },

    getReceivers: function() {
        var sources = this.room.sources();
        return _.filter(this.link, function(link) {
            // return link.pos.inRangeTo(room.getSpanw(), 5);
            for (var s in sources) {
                if (!link.pos.inRangeTo(sources[s], 5)) {
                    return true;
                }
            }
        });
    },

    transfer : function() {
        var senders = this.getSenders();
        var receiver = _.find(this.getReceivers(), function(r) {
            return (r.energy < r.maxEnergy);
        });

        if (receiver != null) {
            for (var s in senders) {
                var sender = senders[s];
                if (sender.cooldown == 0 && sender.energy == sender.maxEnergy) {
                    sender.transferEnergy(receiver);
                }
            }
        }

    }

});

module.exports = LinkController;