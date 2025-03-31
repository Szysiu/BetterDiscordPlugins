/**
 * @name RestoreOldUserMenu
 * @version 1.1
 * @description Restore the old user menu style
 * @updateUrl https://raw.githubusercontent.com/Szysiu/BetterDiscordPlugins/main/RestoreOldUserMenu/RestoreOlduserMenu.plugin.jsgi
 * @author Szysiu#1878
 */

module.exports = class RestoreOldUserMenu {
    constructor() {
        this.start();
    }

    start() {
        this.adjustMenuWidth()
    }

    adjustMenuWidth() {
        const leftPannelWidth = document.querySelector('.itemsContainer_ef3116').offsetWidth
        const menu = document.querySelector('.panels_c48ade')

        if(!menu || leftPannelWidth) {
            console.error('Required DOM elements not found')
        }

        menu.style.setProperty("left", `${leftPannelWidth}px`, "important")
        menu.style.setProperty("border-radius", '0px', "important")
        menu.style.setProperty("box-sizing", 'content-box', "important")

        this.sidebarListOnResize(menu)
    }

    sidebarListOnResize(menu) {
        const sidebarList = document.querySelector('.sidebarList_c48ade')

        const reziseObserver = new ResizeObserver(() => {
            let sidebarListWidth = sidebarList.offsetWidth
            menu.style.setProperty("width", `${sidebarListWidth}px`, "important")
        })

        reziseObserver.observe(sidebarList)
    }

    stop() {
        
    }
};
