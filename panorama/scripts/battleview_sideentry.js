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


(function() {
    var panel = $.GetContextPanel();
    panel.init = function(playerID) {
        panel.playerID = playerID; //Keep it stored.
        var playerInfo = Game.GetPlayerInfo( playerID );
        $("#name").text = Players.GetPlayerName(playerID);
        $("#hero").SetImage( "file://{images}/heroes/" + playerInfo.player_selected_hero + ".png" );
        $.Msg('url("s2r://panorama/images/heroes/' + Players.GetPlayerSelectedHero(playerID) + '.png");');
    }
    panel.update = function() {
        //This is called from ingame every 0.05 seconds
        var hero = Players.GetPlayerHeroEntityIndex(panel.playerID);
        var healthPercent = Entities.GetHealth(hero) / Entities.GetMaxHealth(hero);
        var manaPercent = Entities.GetMana(hero) / Entities.GetMaxMana(hero);
        //$.Msg(healthPercent*100 + " | " + manaPercent*100);
        if ($.GetContextPanel().BHasClass("rightAlign")) {
            $("#healthbar").style.x = 100 - (healthPercent*100) + "%";
            $("#manabar").style.x = 100 - (manaPercent*100) + "%";
        }
        $("#healthbar").style.width = (healthPercent*100) + "%";
        $("#manabar").style.width = (manaPercent*100) + "%";
    }
})();