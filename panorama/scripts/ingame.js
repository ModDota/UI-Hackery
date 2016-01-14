$.Msg("Welcome to Ingame, population ME!");

GameEvents.Subscribe("dota_player_pick_hero", function(keys) {
    $.Msg("===== DOTA_PLAYER_PICK_HERO =====")
    $.Msg("Player: " + keys.player);
    $.Msg("Index:  " + keys.heroindex);
    $.Msg("Hero:   " + keys.hero);
    $.Msg("=================================");
} );