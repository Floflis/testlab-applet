const Applet = imports.ui.applet;
const PopupMenu = imports.ui.popupMenu;
const St = imports.gi.St;
const Util = imports.misc.util;

class TestLab extends Applet.IconApplet {
    constructor(orientation, panelHeight, instance_id) {
        super(orientation, panelHeight, instance_id);

        // Create the UI elements
        this.actor.label_actor = new St.Label({ text: "Mobile mode" });
        this.switch = new PopupMenu.SwitchMenuItem(false);

        // Add a header to the UI
        this.header = new St.Label({
            style_class: "testlab-header",
            text: "Floflis TestLab"
        });

        // Add the UI elements to the applet
        this.actor.add_child(this.header);
        this.actor.add_child(this.actor.label_actor);
        this.actor.add_child(this.switch.actor);

        // Connect the switch button to the Bash scripts
        this.switch.connect('toggled', () => {
            const isMobileMode = this.switch.state;

            if (isMobileMode) {
                Util.spawnCommandLine('/path/to/mobile-mode.sh');
            } else {
                Util.spawnCommandLine('/path/to/desktop-mode.sh');
            }
        });
    }
}

function main(metadata, orientation, panelHeight, instance_id) {
    return new TestLab(orientation, panelHeight, instance_id);
}
