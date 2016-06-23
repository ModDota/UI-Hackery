function repeat(pattern, count) { 
    if (count < 1) return '';
    var result = '';
    while (count > 1) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
}

function innerDump(indent, object) {
    for (var v in object) {
        if(typeof object[v] == "object") {
            $.Msg(repeat("\t", indent) + "\""+v+"\" : {");
            indent++;
            innerDump(indent, object[v]);
            indent--;
            $.Msg(repeat("\t", indent) + "},");
        } else if(typeof object[v] == "function") {
            //Suckers!
        } else {
            $.Msg(repeat("\t", indent) + "\""+v+"\" : \""+object[v]+"\",");
        }
    }
}

function updateLoop() {
    if (running == false) {
        return;
    }
    //$.Msg(Game.GetState());
    if (Game.GetState() < 5) { //5 is TEAM_SHOWCASE
        $.Msg("Game state too low, soz not soz");
        running = false;
        return;
    }
    if (Game.GetState() > 7) { //7 is GAME_IN_PROGRESS
        $.Msg("Game state too high, soz not soz");
        $.GetContextPanel().RemoveAndDeleteChildren();
        running = false;
        return;
    }
    if (dirty) {
        $.GetContextPanel().RemoveAndDeleteChildren();
    }
    var playerIDs = Game.GetAllPlayerIDs();//
    for (var playerID of playerIDs) {
        if (Players.IsValidPlayerID(playerID)) {
            if (Players.GetTeam(playerID) == 1) {
                    continue;
            }
            if (dirty) {
                var sidePanel = $.CreatePanel("Panel", $.GetContextPanel(), "player-" + playerID);
                sidePanel.BLoadLayout("file://{resources}/layout/sinzational_hax/battleview_sideentry.xml", false, false);
                sidePanel.style.y = 100 + ((playerID % 5) * 150) + "px";
                var team = Players.GetTeam(playerID);
                if (team == 2) {
                    sidePanel.style.x = "0px";
                } else {
                    sidePanel.style.x = 1920 - 400 + "px";
                    sidePanel.AddClass("rightAlign");
                }
                sidePanel.init(playerID);
            }
            $("#player-" + playerID).update();
        }
    }
    dirty = false;
    $.Schedule(0.05, updateLoop);
}

var dirty = true;
var running = false;

$.Msg("Welcome to Ingame, population ME!");
Game.sinz_ingame = function() {
    $.Msg("sinz_ingame pressed");
    $.GetContextPanel().RemoveAndDeleteChildren();
    running = !running;
    if (running) {
        dirty = true;
         $.Schedule(0.05, updateLoop);   
    }
}
GameEvents.Subscribe("game_rules_state_change", function(keys) {
    dirty = true;
    if (running == false) {
         $.Schedule(0.05, updateLoop);   
    }
});

GameEvents.Subscribe("dota_player_pick_hero", function(keys) {
    $.Msg("===== DOTA_PLAYER_PICK_HERO =====")
    $.Msg("Player: " + keys.player);
    $.Msg("Index:  " + keys.heroindex);
    $.Msg("Hero:   " + keys.hero);
    $.Msg("=================================");
} );