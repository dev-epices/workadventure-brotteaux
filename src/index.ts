/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

bootstrapExtra(); // Calling bootstrapExtra will initiliaze all the "custom properties"  

const BOT_NAME = 'Alfred'
const ZONES : any = {
    officeEpicesDev: 'Epices - Dev',
    officeEpicesSUpport: 'Epices - Support',
    jitsiChillZone: 'Pause café',
    jitsiGaia: 'Gaia',
    jitsiHelios: 'Helios',
    jitsiEole: 'Eole',
    silent: 'Ne pas déranger',
    terrace: 'Pause repas'
}

WA.onInit().then(() => {
    const players: any = WA.state.loadVariable('players')
    console.log(players)
    WA.state.saveVariable('players', {...players, [WA.player.name]: ''})
});

window.addEventListener('beforeunload', function (e) {
    const players: any = WA.state.loadVariable('players')
    delete players[WA.player.name]
    WA.state.saveVariable('players', players)
});

//////// MENU
WA.ui.registerMenuCommand("Liste de presence", () => {
    const players: any = WA.state.loadVariable('players')
    /*const text: string = players
        ? Object.entries(players).map(([name, zone]) => `${name} : ${zone}`).join("\n")
        //? players
        : 'No one online'
    WA.chat.sendChatMessage(`'//// Liste de présence :\n${text}`, "Bot")*/
    WA.chat.sendChatMessage('//// Liste de présence :', BOT_NAME)
    Object.entries(players).forEach(([name, zone]: [string, any]) => {
        if (name === WA.player.name) return
        const whereAt : string = (zone != '' ? ` : ${ZONES[zone]}` : '')
        WA.chat.sendChatMessage(`${name}${whereAt}`, BOT_NAME)
    })
})


/////// ZONES
Object.keys(ZONES).forEach(office => {
    WA.room.onEnterZone(office, () => {
        const players: any = WA.state.loadVariable('players')
        WA.state.saveVariable('players', {...players, [WA.player.name]: office})
    })
    
    WA.room.onLeaveZone(office,  () => {
        const players: any = WA.state.loadVariable('players')
        WA.state.saveVariable('players', {...players, [WA.player.name]: ''})
    })
})
