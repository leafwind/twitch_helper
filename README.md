# A Twitch UI Helper

## Dev

### How to load this Chrome Extension

1. `git clone` this project

2. Visit `chrome://extensions` in your browser.

3. Ensure that the **Developer mode** checkbox in the top right-hand corner is checked.

4. Click **Load unpacked extension…** to pop up a file-selection dialog.

5. Navigate to this repo directory and select the `build` folder.

### Backend

It will retrieve information from backend server via http connection. (given user name and channel name)

#### Debug

* `No 'Access-Control-Allow-Origin' header is present on the requested resource.`
    * try add your site in permissions in manifest.json

## Does this extension need my account authorization?

No. This extension does not need any authority.

It just get user name and channel name from the web source code.


## Credits

### Template

This extension was initialized by [Extensionizr](http://extensionizr.com/).

### arrive.js

Watch element created by [arrive.js](https://github.com/uzairfarooq/arrive)

