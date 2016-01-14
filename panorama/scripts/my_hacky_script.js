// Utility functions

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

function FindChildFromRoot(path) {
    var elem = $.GetContextPanel();
    return FindChildByPath(elem,path);
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



function embiggenTextbox() {
    var zetReleaseAd = FindChildFromRoot([0,0,2,0,0,1,1,0,0,0,0,0]);
    zetReleaseAd.style.height = "232px";
    var zuusArcanaAd = FindChildFromRoot([0,0,2,0,0,1,1,0,1,0,0,0]);
    zuusArcanaAd.style.height = "232px";
    var chatbox = FindChildFromRoot([0,3,1,0,2,0,0]);
    chatbox.style.height = "480px";
}

function main() {
    $.Msg("=====================================");
    $.Msg("| Loading ModDota Hackery...        |");
    $.Msg("-------------------------------------");

    // Make the control zoo button appear
    $.Msg("| Showing Zoo...                    |");
    var controlZooButton = FindChildFromRoot([0,0,2,10,1,1,2,1,1]);
    controlZooButton.visible = true;
    controlZooButton.checked = false;
    
    // Make the chat box bigger
    $.Msg("| Embiggening Chat...               |");
    // we need to delay this, because a lot of the elements aren't added until after the background map loads
    // TODO: wait until after the map load event, not for some arbitrary timeframe
    $.Schedule(10,embiggenTextbox);

    // Testing stuff
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
}

main();
