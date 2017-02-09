function getTwitchChatButtonAndInsertBeforeIt(twitch_helper_button) {
    var selector = ".js-chat-buttons.chat-buttons-container.clearfix"
    document.arrive(selector, {onceOnly: true, existing: true}, function() {
        var chat_container = $(selector)[0];
        console.log('[arrive] chat_container, innerText: ' + chat_container.innerText);
        chat_container.insertBefore( twitch_helper_button, chat_container.children[chat_container.children.length - 1]);
    });

}

function getRealUserId(raw_user_id) {
    if ( raw_user_id.endsWith(")") ) {
        // has Asia Nickname
        var user_id = raw_user_id.split('(')[1].split(')')[0]
        console.warn("[Asia Nick Name] user id = " + user_id)
        return user_id
    }
    else {
        console.warn("[English ID] user id = " + raw_user_id)
        return raw_user_id
    }
}

function setUserIdOnHelperButton(twitch_helper_button, channel) {
    var selector = "div[class=chat-menu-content] > div[class=ember-view] > span[class=strong]"
    document.arrive(selector, {onceOnly: true, existing: true}, function() {
        var raw_user_id_dom = $(selector)[0]
        user_id = getRealUserId(raw_user_id_dom.innerText)
        $.get("https://bot.leafwind.tw/signin?user=" + user_id + "&channel=" + channel, function(data, status){
            twitch_helper_button.innerText = data.last_date + " / 第 " + data.count + " 次"
        });
    });
}

function readyDo() {
    console.log("Hello. This message was sent from scripts/inject.js");

    // get channel from URL
    var channel = $(location).attr('href').split('twitch.tv/')[1].split('/')[0];
    console.log("channel: " + channel);

    // create a helper button, lock to specific channel for now
    if(channel == "wow_tomato") {
        var twitch_helper_button = document.createElement("button")
        twitch_helper_button.className = "button float-left qa-chat-buttons__submit js-chat-buttons__submit"
        twitch_helper_button.id = "twitch-helper-button"
        twitch_helper_button.innerText = 'loading..'

        setUserIdOnHelperButton(twitch_helper_button, channel);
        getTwitchChatButtonAndInsertBeforeIt(twitch_helper_button);
    }
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
