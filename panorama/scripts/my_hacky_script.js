function FindChildByPath(root, path) {
    var elem = root;
    $.Msg("=========");
    while (path.length > 0) {
        var index = path[0];
        elem = elem.GetChild(index);
        $.Msg(elem.id + " " + index);
        path = path.splice(1,path.length-1);
    }
    $.Msg("=========");
    return elem;
}

$.Msg("This is a print from inside hacky script 5");
var arcadeButton = FindChildByPath($.GetContextPanel(), [0,0,2,10,1,1,1,5]);
$.Msg(arcadeButton.GetAttributeString("onactivate", "EMPTY"));
//arcadeButton.checked = true; 
//$.DispatchEvent("DOTAWatchTournamentDetailsCompendium");
$.DispatchEvent("DOTAShowPrimaryTabPage", "TopBarMods");
$.Msg(	Game.Time());

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
            //$.Msg("$.GetContextPanel()." + v + " = (" + typeof $.GetContextPanel()[v] + ") " + $.GetContextPanel()[v]);
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



$.Msg("=====================================");
$.Msg("[");

//var controlZooButton = $.GetContextPanel().GetChild(0).GetChild(0).GetChild(2).GetChild(10).GetChild(1).GetChild(1).GetChild(2).GetChild(1).GetChild(1);
var controlZooButton = FindChildByPath($.GetContextPanel(), [0,0,2,10,1,1,2,1,1]);
//controlZooButton = $("#ZooButton");
$.Msg("Hai" + $.GetContextPanel().GetParent());
innerDump(0, arcadeButton.data());
controlZooButton.visible = true;
controlZooButton.checked = false;
$.Msg("]");


$.Msg("=====================================");
$.Msg("This is a giant dump in base");
$.Msg("=====================================");
for (v in controlZooButton) {
    if(typeof controlZooButton[v] == "object") {
        $.Msg(v + " = {");
        for (w in controlZooButton[v]) {
            $.Msg("\t"+v+"." + w + " = " + (""+controlZooButton[v][w]));
        }
        $.Msg("}");
    } else {
        $.Msg("controlZooButton." + v + " = (" + typeof controlZooButton[v] + ") " + controlZooButton[v]);
    }
}
$.Msg("=====================================");
$.Msg("This is a GetContextPanel dump");
$.Msg("End of Script!")