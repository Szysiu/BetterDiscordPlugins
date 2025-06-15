/**
 * @name RestoreOldUserMenu
 * @version 1.4.5
 * @description Restore the old user menu style.
 * @updateUrl https://raw.githubusercontent.com/Szysiu/BetterDiscordPlugins/main/RestoreOldUserMenu/RestoreOlduserMenu.plugin.js
 * @github https://github.com/Szysiu/BetterDiscordPlugins/tree/main/RestoreOldUserMenu
 * @author Szysiu#1878
 * @downloadUrl https://raw.githubusercontent.com/Szysiu/BetterDiscordPlugins/main/RestoreOldUserMenu/RestoreOlduserMenu.plugin.js
 */

const config = {
    info: {
        name: "RestoreOldUserMenu",
        authors: [{ name: "Szysiu" }],
        version: "1.4.5",
        description: "Restore the old user menu style.",
        github_raw: "https://raw.githubusercontent.com/Szysiu/BetterDiscordPlugins/main/RestoreOldUserMenu/RestoreOlduserMenu.plugin.js",
    },
    changelog: [],
    defaultConfig: [],
};

module.exports = class RestoreOldUserMenu {
    constructor() {
        this._config = config;
        this.observer = null;
        this.start();
    }

    start() {
        this.adjustMenuWidth();
    }

    adjustMenuWidth() {
        const leftPanelWidth = document.querySelector('.itemsContainer_ef3116').offsetWidth;
        const menu = document.querySelector('.panels_c48ade');
        if (!menu || !leftPanelWidth) {
            console.error('Required DOM elements not found');
        }
        menu.style.setProperty("left", `${leftPanelWidth}px`, "important");
        menu.style.setProperty("border-radius", '0px', "important");
        menu.style.setProperty("box-sizing", 'content-box', "important");
        this.sidebarListOnResize(menu);
    }

    sidebarListOnResize(menu) {
        const sidebarList = document.querySelector('.sidebarList_c48ade');
        this.observer = new ResizeObserver(() => {
            let sidebarListWidth = sidebarList.offsetWidth;
            menu.style.setProperty("width", `${sidebarListWidth}px`, "important");
        });
        this.observer.observe(sidebarList);
    }

    revertChanges() {
        const menu = document.querySelector('.panels_c48ade');
        if (!menu) {
            console.error(`Object ${menu} not found`);
        }
        menu.style.removeProperty("left");
        menu.style.removeProperty("border-radius");
        menu.style.removeProperty("box-sizing");
        menu.style.removeProperty("width");
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }

    stop() {
        this.revertChanges();
    }
};
