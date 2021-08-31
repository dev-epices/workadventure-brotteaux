/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

let currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();
const BOT_NAME = 'Alfred'
const ZONES : any = {
    officeEpicesDev: 'Epices - Dev',
    officeEpicesSUpport: 'Epices - Support',
    jitsiChillZone: 'Pause café',
    jitsiGaia: 'Gaia',
    jitsiHelios: 'Helios',
    jitsiNeptune: 'Neptune',
    silent: 'Ne pas déranger'
}

WA.onInit().then(() => {
    const players: any = WA.state.loadVariable('players')
    console.log(players)
    WA.state.saveVariable('players', {...players, [WA.player.name]: ''})
});

//////// MENU
WA.ui.registerMenuCommand("Liste de presence", () => {
    const players: any = WA.state.loadVariable('players')
    /*const text: string = players
        ? Object.entries(players).map(([name, zone]) => `${name} : ${zone}`).join("\n")
        //? players
        : 'No one online'
    WA.chat.sendChatMessage(text, "Bot")*/
    WA.chat.sendChatMessage('//// Liste de présence :', BOT_NAME)
    Object.entries(players).forEach(([name, zone]: [string, any]) => {
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


WA.room.onEnterZone('clock', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveZone('clock', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
