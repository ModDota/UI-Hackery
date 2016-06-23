var main = $.CreatePanel("Panel", $.GetContextPanel(), "SinZationalHax");
main.BLoadLayout("file://{resources}/layout/sinzational_hax/ingame.xml", false, false);
$.Msg("Ingame Core Loaded. If this happens twice, everything here breaks");

function WrapFunction(name) {
    return function() {
        Game[name](arguments);
    }
}
Game.AddCommand("sinz_ingame", WrapFunction("sinz_ingame"), "Testing 123", 0);
