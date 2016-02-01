// Utility functions

function FindChildByPath(root, path, print) {
    var elem = root;
    if (print) {
        $.Msg("=========");
    }
    while (path.length > 0) {
        var index = path[0];
        elem = elem.GetChild(index);
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
    var elem = $.GetContextPanel();
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
   $.DispatchEvent("DOTAShowItemDefPage", 11094);
});

function openCompendium(test1,test2,test3,test4,test5) {
    $.Msg("COMPENDIUM!");
    $.DispatchEvent("DOTAShowCompendiumLeaguePage", parseInt(test2), parseInt(test3), test4);
    $.Msg("OpenCompendium");
}

function main() {
    $.Msg("=====================================");
    $.Msg("| Loading ModDota Hackery...        |");
    $.Msg("-------------------------------------");
    Game.AddCommand("sinz_compendium", openCompendium, "Testing 123", 0);


    // Make the control zoo button appear
    $.Msg("| Showing Zoo...                    |");
    var controlZooButton = FindChildFromRoot([0,0,3,10,1,1,2,1,1]);
    controlZooButton.visible = true;
    controlZooButton.checked = false;

    //Keybind experiment
    /*
        Second argument is a comma seperated array of key strings.
        Can be keys from key_0 to key_9, key_a to key_z.
        key_f1 to key_f12 and various other keys.
    */
    $.RegisterKeyBind($.GetContextPanel(), "key_f9", function() {
        FindChildFromRoot([0,0,0,0]).BCreateChildren("<DOTAScenePanel id='BackgroundMap' map='maps/terrain_previews/dota_desert_preview.vmap' camera='default_camera' />");
    });
    $.RegisterKeyBind($.GetContextPanel(), "key_f10,key_pad_divide", function() {
        FindChildFromRoot([0,0,0,0]).BCreateChildren("<DOTAScenePanel id='BackgroundMap' map='maps/terrain_previews/dota_default_preview.vmap' camera='default_camera' />");
    });
    $.RegisterKeyBind($.GetContextPanel(), "key_f11", function() {
        FindChildFromRoot([0,0,0,0]).BCreateChildren("<DOTAScenePanel id='BackgroundMap' map='backgrounds/dashboard_parallax_test' camera='shot_cameraA' />");
    });
    $.RegisterKeyBind($.GetContextPanel(), "key_up,key_down,key_left,key_right", function(test,test2,test3) {
       $.Msg(test," | ",test2," | ",test3);
    });
    
    altDump("controlZooButton", controlZooButton);    
}

main();
