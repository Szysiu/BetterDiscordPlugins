/**
 * @name RestoreOldUserMenu
 * @version 1.4
 * @description Restore the old user menu style - test
 * @updateUrl https://raw.githubusercontent.com/Szysiu/BetterDiscordPlugins/main/RestoreOldUserMenu/RestoreOlduserMenu.plugin.js
 * @downloadUrl https://raw.githubusercontent.com/Szysiu/BetterDiscordPlugins/main/RestoreOldUserMenu/RestoreOlduserMenu.plugin.js
 * @author Szysiu#1878
 */

module.exports = class RestoreOldUserMenu {
    constructor() {
        this.observer = null
        this.start();
    }

    start() {
        this.adjustMenuWidth()
    }

    adjustMenuWidth() {
        const leftPanelWidth = document.querySelector('.itemsContainer_ef3116').offsetWidth
        const menu = document.querySelector('.panels_c48ade')

        if(!menu || leftPanelWidth) {
            console.error('Required DOM elements not found')
        }

        menu.style.setProperty("left", `${leftPanelWidth}px`, "important")
        menu.style.setProperty("border-radius", '0px', "important")
        menu.style.setProperty("box-sizing", 'content-box', "important")

        this.sidebarListOnResize(menu)
    }

    sidebarListOnResize(menu) {
        const sidebarList = document.querySelector('.sidebarList_c48ade')

        this.observer = new ResizeObserver(() => {
            let sidebarListWidth = sidebarList.offsetWidth
            menu.style.setProperty("width", `${sidebarListWidth}px`, "important")
        })

        this.observer.observe(sidebarList)
    }

    revertChanges() {
        const menu = document.querySelector('.panels_c48ade')

        if(!menu) {
            console.error(`Object ${menu} not found`)
        }

        menu.style.removeProperty("left")
        menu.style.removeProperty("border-radius")
        menu.style.removeProperty("box-sizing")
        menu.style.removeProperty("width")

        if(this.observer) {
            this.observer.disconnect()
            this.observer = null
        }
    }

    stop() {
        this.revertChanges()
    }
};
