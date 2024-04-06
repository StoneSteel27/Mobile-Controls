//const ui = require("ui-lib/library");
//print("Heyyyyyyyy");
var activated = 0;
var orgx = 0
var orgy = 0

function func() {
    activated = !activated;
    if (activated) {
        print("Pan Activated");
            Vars.ui.showInfoToast("Pan mode: [green]ON", 3); orgx = Core.camera.position.x; orgy = Core.camera.position.y; Vars.control.setInput(new DesktopInput()); Core.settings.put("keyboard", true);
            var key = Core.keybinds.get(Binding.pan).key.ordinal(); Reflect.get(Core.input.getKeyboard(), "pressed").add(key);
        }
        else {
            print("Pan Deactivated");
            Vars.ui.showInfoToast("Pan mode: [red]OFF", 3);
            var key = Core.keybinds.get(Binding.pan).key.ordinal();
            Reflect.get(Core.input.getKeyboard(), "pressed").remove(key);
            Core.settings.put("keyboard", false);
            Core.camera.position.x = orgx;
            Core.camera.position.y = orgy;
            Vars.control.setInput(new MobileInput());
        }
    }
	
Events.on(ClientLoadEvent, e => {Core.scene.find("waves").add(Packages.mindustry.ui.MobileButton(Vars.ui.getIcon("copy"), "Pan", func))});
