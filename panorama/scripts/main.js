// Utility functions asdasdsad

function FindChildByPath(root, path, print) {
    var elem = root;
    if (print) {
        $.Msg("=========");
    }
    while (path.length > 0) {
        var index = path[0];
        elem = elem.FindChildTraverse(index);
        if (print) {
            $.Msg(elem.id + " " + index);
        }
        path = path.splice(1,path.length-1);
    }
    if (print) {
        $.Msg("=========");
    }
    return elem;
}

function FindChildFromRoot(path, print) {
    var elem = $.GetContextPanel().GetParent();
    return FindChildByPath(elem,path, print);
}

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

function dump(indent, object) {
    var len = object.GetChildCount();
    for (var i=0; i < len; i++) {
        $.Msg(repeat("\t", indent++) + "{");
        innerDump(indent, object.GetChild(i));
        $.Msg(repeat("\t", indent) + "\"children\" : [");
        dump(indent + 1, object.GetChild(i));
        $.Msg(repeat("\t", indent) + "]");
        if (i == len-1) {
            $.Msg(repeat("\t", --indent) + "}");
        } else {
            $.Msg(repeat("\t", --indent) + "},");
        }
    }
}

function altDump(name, object) {
    $.Msg("=====================================");
    $.Msg("This is a giant dump in " + name);
    $.Msg("=====================================");
    for (var v in object) {
        if(typeof object[v] == "object") {
            $.Msg(v + " = {");
            for (w in object[v]) {
                $.Msg("\t"+v+"." + w + " = " + (""+object[v][w]));
            }
            $.Msg("}");
        } else {
            $.Msg(name+"." + v + " = (" + typeof object[v] + ") " + object[v]);
        }
    }
    $.Msg("=====================================");
}

$.RegisterKeyBind($.GetContextPanel(), "key_f1", function() {
   $.Msg("F1 pressed");
   $.DispatchEvent("DOTAShowBPSpring2016TreeGamePage");//
});

function openCompendium(args) {
    var pages = FindChildFromRoot(["Dashboard", "DashboardCore", "DashboardForeground", "DashboardPages"]);
    pages.FindChildTraverse("DOTAHomePage").RemoveClass("PageVisible");
    var test = $.CreatePanel( "Panel", pages, "SinZationalHax" );
    test.LoadLayoutAsync("s2r://panorama/layout/dashboard_page_test.vxml_c", false, false);
    test.AddClass("PageVisible");
    /*var zoo4 = FindChildFromRoot(["Dashboard", "DashboardCore", "DashboardForeground", "DashboardPages", "DOTAControlsLibrary", "ZooTabContents", "ZooDebug4"], true);
    zoo4.RemoveAndDeleteChildren();
    zoo4.BCreateChildren("<WeekendTourneyStatusPanel id='test' style='width:500px;height:500px;'    />");
    FindChildByPath(zoo4, ["test", "NotInTourney"]).BCreateChildren("<Button class='BlueButton' onactivate='DOTAPlayPanelCloseButtonClicked(true); DOTAShowWeekendTourneyPage();'><Label text='Learn More' /> </Button>");
    var zoo5 = FindChildFromRoot(["Dashboard", "DashboardCore", "DashboardForeground", "DashboardPages", "DOTAControlsLibrary", "ZooTabContents", "ZooDebug5"], true);
    zoo5.RemoveAndDeleteChildren();
    zoo5.BCreateChildren("<DOTAWeekendTourneySetup id='test' class='LocalPlayerIsPartyLeader TeamIdentityTypePickup'    />");
    FindChildByPath(zoo5, ["test", "PageBodyContainer"]).AddClass("StateSetup");*/
}

function main() {
    Game.sinz_compendium = openCompendium;
    
    $.Msg("=====================================");
    $.Msg("| Loading ModDota Hackery...        |");
    $.Msg("-------------------------------------");
    //Game.AddCommand("sinz_compendium", openCompendium, "Testing 123", 0);


    // Make the control zoo button appear
    $.Msg("| Showing Zoo...                    |");
    var controlZooButton = FindChildFromRoot(["Dashboard", "DashboardCore", "DashboardForeground", "TopBar", "TopBarContent", "TopBarMainContent", "TopBarRightButtons", "DevButtons", "ZooButton"]);
    controlZooButton.visible = true;
    controlZooButton.checked = false;
    altDump("controlZooButton", controlZooButton);///
    
    
    //$.DispatchEvent("DOTAShowWeekendTourneyPage");///
    //var pages = FindChildFromRoot(["Dashboard", "DashboardCore", "DashboardForeground", "DashboardPages"]);
    //pages.FindChildTraverse("DOTAHomePage").RemoveClass("PageVisible");
    //pages.BCreateChildren("<DOTAWeekendTourneyPage id='Testing2' class='DashboardPage PageVisible Loaded' style='visibility : visible;'/>");
    //var loading = FindChildByPath(pages, ["Testing2", "ContainerLoaded", "Bracket"]);
    //loading.AddClass("TournamentTypeAutomatedWin3");
    //Keybind experiment
    /*
        Second argument is a comma seperated array of key strings.
        Can be keys from key_0 to key_9, key_a to key_z.
        key_f1 to key_f12 and various other keys.
    */
    $.RegisterKeyBind($.GetContextPanel(), "key_f8", function() {
        FindChildFromRoot(["Dashboard","DashboardCore","DashboardBackground"]).BCreateChildren("<DOTAScenePanel id='BackgroundMap' map='scenes/battlepass_ti6/tree_game' acceptsinput='true' camera='shot_cameraA' />");
    });
    $.RegisterKeyBind($.GetContextPanel(), "key_f9", function() {
        FindChildFromRoot(["Dashboard","DashboardCore","DashboardBackground"]).BCreateChildren("<DOTAScenePanel id='BackgroundMap' map='maps/terrain_previews/dota_desert_preview.vmap' camera='default_camera' />");
    });
    $.RegisterKeyBind($.GetContextPanel(), "key_f10,key_pad_divide", function() {
        FindChildFromRoot(["Dashboard","DashboardCore","DashboardBackground"]).BCreateChildren("<DOTAScenePanel id='BackgroundMap' map='maps/terrain_previews/dota_default_preview.vmap' camera='default_camera' />");
    });
    $.RegisterKeyBind($.GetContextPanel(), "key_f11", function() {
        FindChildFromRoot(["Dashboard","DashboardCore","DashboardBackground"]).BCreateChildren("<DOTAScenePanel id='BackgroundMap' map='backgrounds/dashboard_parallax_test' camera='shot_cameraA' />");
    });
    $.RegisterKeyBind($.GetContextPanel(), "key_up,key_down,key_left,key_right", function(test,test2,test3) {
       $.Msg(test," | ",test2," | ",test3);
    });
    /*
    
    var gamemodeDropdown = FindChildFromRoot([0,4,2,0,0,0,2,1,1], true); 
    gamemodeDropdown.RemoveAndDeleteChildren();
    gamemodeDropdown.BCreateChildren("<Label id=\"gamemode1\" class=\"DropDownChild\" text=\"ALL PICK\" />"); */
    
}

main();
