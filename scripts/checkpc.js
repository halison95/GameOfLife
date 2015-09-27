function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone"];
    //var Agents = ["Android", "iPhone",
    //            "SymbianOS", "Windows Phone",
    //            "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    //document.write(""+flag);
    return flag;
}

//0:PC 1:Phone 2:Pad
function checkDevice() {
    var userAgentInfo = navigator.userAgent;
    var AgentPhone = ["Android", "iPhone", "SymbianOS", "Windows Phone"];
    var AgentPad = ["iPad", "iPod"];
    for (var v = 0; v < AgentPhone.length; v++) {
        if (userAgentInfo.indexOf(AgentPhone[v]) > 0) {
            return 1;
        }
    }
    for (var v = 0; v < AgentPad.length; v++) {
        if (userAgentInfo.indexOf(AgentPad[v]) > 0) {
            return 2;
        }
    }
    return 0;
}