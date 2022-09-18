const ui = require("ui-lib/library");

var activated = 0;

ui.addButton("Pan for Mobile", "copy", () => {
	activated = !activated;
	if (activated){
		Core.settings.put("keyboard",true)
		var key = Core.keybinds.get(Binding.pan).key.ordinal()
		Reflect.get(Core.input.getKeyboard(), "pressed").add(key)
	} else {
		Core.settings.put("keyboard",false)
		var key = Core.keybinds.get(Binding.pan).key.ordinal()
		Reflect.get(Core.input.getKeyboard(), "pressed").remove(key)
	}
});
