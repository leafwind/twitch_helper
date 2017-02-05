chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");

        // get user id
        var user = $("a[data-tt_content='self_channel'")[0].pathname.substr(1)
        console.warn("user name = " + user)
        // get the twitch chat botton
        var chat_container = document.getElementsByClassName("js-chat-buttons chat-buttons-container clearfix")[0];

        var newButton = document.createElement("button")
        newButton.className = "button float-left qa-chat-buttons__submit js-chat-buttons__submit"
        newButton.innerText = "ㄈ溫"
        newButton.id = "twitch-helper-button"
        chat_container.insertBefore(newButton, chat_container.children[chat_container.children.length - 1]);
		// ----------------------------------------------------------

	}
	}, 10);
});
