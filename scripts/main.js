//const ui = require("ui-lib/library");
//print("Heyyyyyyyy");
var pan_activate = 0;
var orgx = 0
var orgy = 0
var sau_activate = 0;
var sauf_activate = 0;


function pan() {
    pan_activate = !pan_activate;
    if (pan_activate) {
        print("Pan pan_activate");
            Vars.ui.showInfoToast("Pan mode: [green]ON", 3); orgx = Core.camera.position.x; orgy = Core.camera.position.y; Vars.control.setInput(new DesktopInput()); Core.settings.put("keyboard", true);
            var key = Core.keybinds.get(Binding.pan).key.ordinal(); Reflect.get(Core.input.getKeyboard(), "pressed").add(key);
        }
        else {
            print("Pan Depan_activate");
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
	var len = Math.floor(Object.keys(Vars.player.team().data().units).lenght);
	for( var u=0 ; u<len; ++u ){
		var unit = Vars.player.team().data().units.get(u);
		if (unit.isCommandable()){
			Vars.control.input.selectedUnits.add(unit);
		}
	}

}
function select_all_unit_factories() {
	sauf_activate = !sauf_activate;
	if (sauf_activate){
		Vars.control.setInput(new DesktopInput()); 
		Core.settings.put("keyboard", true);
		var key1 = Core.keybinds.get(Binding.select_all_unit_factories).key.ordinal();
		var com1 = Core.keybinds.get(Binding.command_mode).key.ordinal();
		Reflect.get(Core.input.getKeyboard(), "pressed").add(com1);
		Reflect.get(Core.input.getKeyboard(), "pressed").add(key1);
		Vars.ui.showInfoToast("select all units factories mode: [green]ON", 3);
	} else {
        var key1 = Core.keybinds.get(Binding.select_all_unit_factories).key.ordinal();
		var com1 = Core.keybinds.get(Binding.command_mode).key.ordinal();
		Reflect.get(Core.input.getKeyboard(), "pressed").remove(key1);
        Reflect.get(Core.input.getKeyboard(), "pressed").remove(com1);
        Core.settings.put("keyboard", false);
		Vars.control.setInput(new MobileInput());
		Vars.ui.showInfoToast("select all units factories mode: [red]OFF", 3);
	}
}
Events.on(ClientLoadEvent, e => {Core.scene.find("waves").add(Packages.mindustry.ui.MobileButton(Vars.ui.getIcon("copy"), "Pan", pan))});
Events.on(ClientLoadEvent, e => {Core.scene.find("waves").add(Packages.mindustry.ui.MobileButton(Vars.ui.getIcon("copy"), "sau", select_all_units))});
Events.on(ClientLoadEvent, e => {Core.scene.find("waves").add(Packages.mindustry.ui.MobileButton(Vars.ui.getIcon("copy"), "saf", select_all_unit_factories))});
