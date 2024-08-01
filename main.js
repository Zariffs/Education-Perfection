// ==UserScript==
// @name         Education Perfection | Zariffs
// @namespace    https://educationperfect.com
// @version      1.0
// @description  An education perfect bot that works with the new education perfect ui and systems
// @author       zariffs
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    var b = [];
    var c = [];
    var e = false;
    var f;
    var m = true;
    var lastSubmittedAnswer = '';  // Variable to keep track of the last submitted answer
    var timerRunning = false;      // Flag to track the timer status

    function initializeScript() {
        console.log("Initialising script...");
        console.log("Number of preview items:", document.querySelectorAll(".preview-grid > .stats-item").length);

        for (var i = 0; i < document.querySelectorAll(".preview-grid > .stats-item").length; i++) {
            var firstChild = document.querySelectorAll(".preview-grid > .stats-item")[i].querySelector(".preview-grid-item-content");
            if (firstChild) {
                var targetLanguage = firstChild.querySelector(".targetLanguage");
                var baseLanguage = firstChild.querySelector(".baseLanguage");
                if (targetLanguage && baseLanguage) {
                    b.push(targetLanguage.innerText);
                    c.push(baseLanguage.innerText);
                    console.log("Added to arrays:", targetLanguage.innerText, baseLanguage.innerText);
                }
            }
        }
    }

    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error("Failed to copy text to clipboard?: ", err);
        }
    }

    function setAnswer(address) {
        var sourceArray = m ? b : c;
        var y = sourceArray[address].split("; ");
        console.log("Extracted answers:", y);
        var inputElement = document.getElementById("answer-text-container").children[0];
        inputElement.value = y[0];
        lastSubmittedAnswer = y[0];
        checkIfInputStays(inputElement);
    }

    function checkIfInputStays(inputElement) {
        setTimeout(() => {
            if (inputElement.value === '') {
                console.log("Input box was cleared, re-setting answer:", lastSubmittedAnswer);
                inputElement.value = lastSubmittedAnswer; 
                checkIfInputStays(inputElement);  // Recursively check until input stays populated | kinda broken
            } else {
                console.log("Input box populated with answer:", inputElement.value);
            }
        }, 500);
    }

    function appendCorrectAnswer() {
        console.log("appendCorrectAnswer function called");
        setTimeout(async function () {
            var correctAnswer = document.getElementById("correct-answer-field").innerText;
            if (m) {
                b.push(correctAnswer);
            } else {
                c.push(correctAnswer);
            }
            lastSubmittedAnswer = correctAnswer;
            await copyToClipboard(correctAnswer);
            reset();
        }, 100);
    }

    function reset() {
        console.log("reset called");
        if (document.querySelector(".modal-body.v-group.h-align-center.ng-scope") == null) {
            console.log("Modal is not present");
            e = false;
        } else {
            console.log("Modal is present, clicking continue button");
            setTimeout(function () {
                document.getElementById("continue-button").click();
                console.log("Clicked continue button.");
                e = false;
            }, 2000);
        }
    }

    function processQuestion() {
        console.log("Processing question...");
        var k = document.getElementById("question-text").innerText;
        var l = k.replace(/, /gi, "; ");
        if (c.indexOf(l) === -1 && b.indexOf(l) === -1) {
            console.log("New question detected, submitting and appending answer");
            if (m) {
                c.push(l);
            } else {
                b.push(l);
            }
            appendCorrectAnswer();
        } else if (c.indexOf(l) !== -1) {
            console.log("Question found in c, selecting answer from c");
            m = true;
            setAnswer(c.indexOf(l));
        } else if (b.indexOf(l) !== -1) {
            console.log("Question found in b, selecting answer from b");
            m = false;
            setAnswer(b.indexOf(l));
        } else {
            console.log("Language perfect has changed its configuration");
        }
    }

    function startTimer() {
        console.log("Starting...");
        f = setInterval(() => {
            const questionTextElement = document.getElementById("question-text");
            if (questionTextElement) {
                const observer = new MutationObserver((mutationsList) => {
                    for (const mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            console.log("Question text changed, processing new question");
                            processQuestion();
                        }
                    }
                });

                observer.observe(questionTextElement, { childList: true, subtree: true });
                processQuestion();
                clearInterval(f);  // Stop the interval since we have the question text element
                timerRunning = true;
            }
        }, 1000);
    }

    function stopTimer() {
        console.log("Stopping");
        clearInterval(f);
        timerRunning = false;
    }

    function waitForPreviewItems() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const previewItems = document.querySelectorAll(".preview-grid > .stats-item").length;
                    if (previewItems >= 1) {
                        console.log("Preview items found, initializing script");
                        initializeScript();
                        observer.disconnect();  // Stop observing once the preview items are found
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    function refreshPreviewItems() {
        console.log("Refreshing preview items...");
        b = [];
        c = [];
        initializeScript();
    }

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'z') {
            if (timerRunning) {
                stopTimer();
            } else {
                startTimer();
            }
        } else if (event.ctrlKey && event.key === 'r') {
            refreshPreviewItems();
        }
    });

    waitForPreviewItems();
})();
