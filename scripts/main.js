var pan_activate = 0;
var orgx = 0
var orgy = 0



function pan() {
    pan_activate = !pan_activate;
    if (pan_activate) {
            Vars.ui.showInfoToast("Pan mode: [green]ON", 3); orgx = Core.camera.position.x; orgy = Core.camera.position.y; Vars.control.setInput(new DesktopInput()); Core.settings.put("keyboard", true);
            var key = Core.keybinds.get(Binding.pan).key.ordinal(); Reflect.get(Core.input.getKeyboard(), "pressed").add(key);
        }
        else {
            Vars.ui.showInfoToast("Pan mode: [red]OFF", 3);
            var key = Core.keybinds.get(Binding.pan).key.ordinal();
            Reflect.get(Core.input.getKeyboard(), "pressed").remove(key);
            Core.settings.put("keyboard", false);
            Core.camera.position.x = orgx;
            Core.camera.position.y = orgy;
            Vars.control.setInput(new MobileInput());
        }
    }
	
function select_all_units() {
	Vars.control.input.commandMode = true;
	Vars.control.input.commandBuildings.clear();
	var len = Vars.player.team().data().units.size;
	for( var u=0 ; u<len; ++u ){
		var unit = Vars.player.team().data().units.get(u);
		if (unit.isCommandable()){
			Vars.control.input.selectedUnits.add(unit);
		}
	}

}

function select_all_unit_factories() {
	Vars.control.input.commandMode = true;
	Vars.control.input.selectedUnits.clear();
	var len = Vars.player.team().data().buildings.size;
	for( var b=0 ; b<len; ++b ){
		var build = Vars.player.team().data().buildings.get(b);
		if (build.block.commandable){
			Vars.control.input.commandBuildings.add(build);
		}
	}
}
Events.on(ClientLoadEvent, e => {Core.scene.find("waves").add(Packages.mindustry.ui.MobileButton(Vars.ui.getIcon("diagonal"), "Pan", pan))});
Events.on(ClientLoadEvent, e => {Core.scene.find("waves").add(Packages.mindustry.ui.MobileButton(Vars.ui.getIcon("units"), "sau", select_all_units))});
Events.on(ClientLoadEvent, e => {Core.scene.find("waves").add(Packages.mindustry.ui.MobileButton(Vars.ui.getIcon("distribution"), "saf", select_all_unit_factories))});
