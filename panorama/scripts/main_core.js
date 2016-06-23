var main = $.CreatePanel("Panel", $.GetContextPanel(), "SinZationalHax");
main.BLoadLayout("file://{resources}/layout/sinzational_hax/main.xml", false, false);
$.Msg("Main Core Loaded. If this happens twice, everything here breaks");

function WrapFunction(name) {
    return function() {
        Game[name](arguments);
    }
}


Game.AddCommand("sinz_compendium", WrapFunction("sinz_compendium"), "Testing 123", 0);
