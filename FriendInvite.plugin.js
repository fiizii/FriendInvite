/**
 * @name FriendInvite
 * @author Fizi
 * @description Generates a friend invite link.
 * @version 1.0.0
 */
let interval;
module.exports = class FriendInvite {
    start() {
        const inviteManager = BdApi.findModule(m => m.createFriendInvite)
        interval = setInterval(() => {
            const found = document.getElementById('invite-button_friend-invite')
            if (!found) {
                try {
                    const button = document.createElement('button')
                    button.innerText = 'Make a Friend Invite'
                    button.class = 'item-3mHhwr'
                    button.id = 'invite-button_friend-invite'
                    button.addEventListener('click', () => {
                        inviteManager.createFriendInvite().then(invite => {
                            window.open('https://discord.gg/' + invite.code)
                            BdApi.showToast('Invite code opened in browser!', { type: 'success' })
                        })
                    })
                    const friendList = document.querySelector(`[aria-label="Friends"]`)
                    const friendListChild = friendList.querySelector(`[role="navigation"]`)
                    friendListChild.appendChild(button)
                } catch (e) { }
            }
        }, 10)

    }

    stop() {
        try {
            const button = document.getElementById('invite-button_friend-invite')
            button.remove()
            clearInterval(interval)
        } catch (e) { }
    }
}
