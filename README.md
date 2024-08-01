# Education Perfection | Zariffs

## be sure to star the project!

## Description
Answer ep questions automatically, will automatically fill in the question box, just spam enter, works as of 01/07/24 

## Features
- **Initialization**: Always gets the correct answer by getting the answers from the answer page before you click start.
- **Answer Management**: Automatically answers questions.
- **Clipboard Management**: Copies correct answers to the clipboard.
- **Preview Item Management**: Refreshes and initializes preview items when needed.
- **Keyboard Shortcuts**: 
  - `Ctrl + Z`: Toggles the timer to start or stop.
  - `Ctrl + R`: Refreshes the preview items.

## Installation
1. Install a UserScript manager like [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/).
2. Create a new UserScript in your manager.
3. Copy and paste the entire script into the new UserScript.
4. Save and enable the UserScript.

## How It Works
1. **Initialization**: On script start, it waits for preview items to be available and then initializes arrays for questions and answers.
2. **Answer Submission**: When a question is detected, the script will submit the answer from the corresponding array.
3. **Clipboard Copying**: Correct answers are copied to the clipboard for convenience.
4. **Modal Handling**: If a modal is present, it clicks the "continue" button after a short delay.
5. **Timer Control**: Observes changes to the question text and processes new questions when detected.

## Usage
- Press `Ctrl + Z` to start or stop the timer that monitors changes to the question text.
- Press `Ctrl + R` to refresh the preview items and update the questions and answers arrays.

## Troubleshooting
- **Script Not Working**: Ensure the script is enabled in your UserScript manager and that you're on the Education Perfect website.
- **No Preview Items Found**: Check the console for any errors and ensure that the preview items are correctly loaded on the page.

## Changelog
- **Version 1.0**: Initial release.

## License
This script is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Future plans
- Work with audio
