function setUserIdOnButton() {
    var selector = "div[class=chat-menu-content] > div[class=ember-view] > span[class=strong]"
    document.arrive(selector, {onceOnly: true, existing: true}, function() {
        console.warn('[arrive] ' + selector)
        console.warn('[arrive] outerHTML: ' + $(selector)[0].outerHTML)
        var raw_user_id = $(selector)[0].innerText
        if ( raw_user_id.endsWith(")") ) {
            // has Asia Nickname
            raw_user_id = raw_user_id.split("(")[1]
            user_id = raw_user_id.substring(0, raw_user_id.length - 1);
            console.warn("[Asia Nick Name] user id = " + user_id)
        }
        else {
            user_id = raw_user_id
            console.warn("[English ID] user id = " + user_id)
        }
        $("#twitch-helper-button")[0].innerText = user_id
    });
}

function readyDo() {
    console.log("Hello. This message was sent from scripts/inject.js");

    // get channel from URL
    var channel = $(location).attr('href').split('twitch.tv/')[1].split('/')[0];
    console.log("channel: " + channel);
    
    // get the twitch chat botton FIXME: use arrive to get chat_container
    var chat_container = $(".js-chat-buttons.chat-buttons-container.clearfix")[0];
    console.log("text of chat_container: " + chat_container.innerText);
    
    var newButton = document.createElement("button")
    newButton.className = "button float-left qa-chat-buttons__submit js-chat-buttons__submit"
    newButton.id = "twitch-helper-button"
    newButton.innerText = 'loading..'
    console.log("newButton.id: " + newButton.id)
    chat_container.insertBefore(newButton, chat_container.children[chat_container.children.length - 1]);

    setUserIdOnButton();
    // ----------------------------------------------------------
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	    if (document.readyState === "complete") {
		    clearInterval(readyStateCheckInterval);
            console.warn("ready");
            readyDo();
	    }
    }, 10);
});
