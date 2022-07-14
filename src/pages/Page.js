/**
 * Created by Kim on 2/28/18.
 *
 * Copyright 2018 2Morrow, Inc. All rights reserved
 */

/**
 * import the common to all modules page object class
 */
// const oCommonToAllModules = require("./commonToAllModules.page.js").default;

/**
 * page class definition for page object model
 */
export default class Page {
    constructor() {
        this.title = "Core Page Object";
        // this.selectors = [];
    }

    selectorToElement(selectors) {
        var requiredElements = [];
        for (var index = 0; index < selectors.length; index++) {
            requiredElements[index] = $(selectors[index]);
        }
        return requiredElements;
    }

    // setSelectors(selectors){
    //   this.selectors = selectors;
    // }

    // setRequiredElements(selectors) {
    // for(var index = 0; index < selectors.length; index++){
    //   this.requiredElements[index] = $(selectors[index]);
    // }
    // }

    // getMustExistElements() {
    //   var requiredElements = [];
    //   for(var index = 0; index < this.selectors.length; index++){
    //     requiredElements[index] = $(this.selectors[index]);
    //   }
    //   return requiredElements;
    // }

    open(path) {
        browser.url(path);
    }

    readGetters(obj) {
        console.log("Page.js reading getters");
        console.log("  keys: " + Object.keys(obj));
        var result = [];
        Object.keys(obj).forEach((property) => {
            var descriptor = Object.getOwnPropertyDescriptor(obj, property);
            if (typeof descriptor.get === "function") {
                result.push(property);
                console.log("  getter: " + property);
            }
        });
        return result;
    }

    // return object whose properties are the getters for common elements
    get selectorsCommonToAllModules() {
        return require("./commonToAllModules.page.js").default;
    }

    /**
     * Gets the back button in the navbar as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get navbar_back_button() {
        return "#navbar_back_button";
    }

    /**
     * Gets the title of the page in the navbar as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get navbar_title() {
        return "#navbar-title";
    }

    /**
     * Gets the hamburger menu in the navbar as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get navbar_hamburgerMenu() {
        return "#navbar_hamburgermenu";
    }

    /**
     * Gets the background image of the lesson as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get posterImage() {
        return ".posterImage";
    }

    /**
     * Gets the bookmark button as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get bookmark() {
        return ".bookmark";
    }

    /**
     * Gets the lesson number as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get lesson_cite() {
        return ".lesson-cite";
    }

    /**
     * Gets the title of the lesson as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get lesson_title() {
        return ".lesson-title";
    }

    /**
     * Gets the subtitle of the lesson as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get lesson_subtitle() {
        return ".lesson-subtitle";
    }

    /**
     * Gets the text content of the lesson as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get lesson_copy() {
        return ".lesson-copy";
    }

    /**
     * Gets the create new note button as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get startANote() {
        return ".fa-sticky-note-o";
    }

    /**
     * Gets the button at the end of the lesson as a WebElement. This can be either a
     * "DONE" (link to library) or "QUIZ" (link to quiz page) button.
     * @return {WebdriverIO.Element}
     */
    get quizOrDoneButton() {
        return "#quiz-button";
    }

    /**
     * Gets the audio player as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get HTML5AudioPlayer() {
        return ".rhap_container";
    }

    /**
     * Gets the "I'd like to read the lesson" button as a WebElement.
     * @return {WebdriverIO.Element}
     */
    get IdLikeToReadButton() {
        return "info-button";
    }

    /**
     * Return an object whose properties are keyed to the selector
     * string.
     *
     * Each selector string has a subproperty that is a selector
     * string for the *final* element selector——what results is
     * a two part selector like
     * '#MHProject_CLessonWidget_Being-In-Your-Body-An-Invitation .posterImage'
     *
     * When consumed, the element pointed to by the two part selector
     * is evaluated depending on the 'type' property. We will evaluate
     * the value returned by the two part selector according to type
     *
     * Elements with values === "*DON'T CARE*" are merely checked for
     * visibility, not content
     *
     * When grabbing text, the app splits paragraphs into spans.
     * To grab something like a wall of text, jquery.text() is
     * effective BUT we may lose spaces around linebreaks. When
     * the test fails, look for excess spaces in the "should be"
     * definition.
     *
     * @returns {Object} with a root of #app_root that represents a page.
     */
    getRequiredContent(pageTitle, graphic, lessonNumber, subtitle, pageText) {
        // the value of the poster image is fairly constant, avoid typing
        let sPathBaseline = require("./URLs.page.js").default.imageBaseURL;
        if (browser.isMobile) {
            // insert correct mobile prefix
        }
        const sValueSuffix = '")';

        return {
            "#app_root": {
                "#navbar-title": {
                    type: "element_text_equals",
                    value: pageTitle,
                },

                ".lesson-cite": new this.SimpleTextEquals(
                    "LESSON " + lessonNumber
                ),
                ".lesson-title": new this.SimpleTextEquals(lessonTitle),
                ".lesson-subtitle": new this.SimpleTextEquals("subtitle"),
                ".lesson-copy": new this.SimpleTextEquals(
                    pageText + "Start a new note"
                ),
                "#quiz-button": new this.SimpleTextEquals("Quiz me on this"),
            },
        };
    }

    /**
     * Creates a page text content check for the page definition.
     * @param {String} sExpectedText To check against the real value in the page
     */
    SimpleTextEquals(sExpectedText) {
        (this["type"] = "element_text_equals"), (this["value"] = sExpectedText);
    }

    /**
     * Adds the background image content to the current page definition
     * @param {Object} content The current page definition object
     * @param {String} graphic Unique part of the image url. Should be the section between "en_us_" and "_widget.jpg".
     */
    addPosterImage(content, graphic) {
        let sPathBaseline = require("./URLs.page.js").default.imageBaseURL;
        if (browser.isMobile) {
            // insert correct mobile prefix
        }
        const sValueSuffix = '")';
        content[".posterImage"] = {
            type: "css_background_image",
            value: sPathBaseline + "en_us_" + graphic + '_widget.jpg")',
        };
    }

    /**
     * Adds a Key and associated value to the current page definition
     * @param {Object} content The current page definition object
     * @param {String} key Key to add to page definition
     * @param {String} text Value for key
     */
    addTextKey(content, key, text) {
        content[key] = new this.SimpleTextEquals(text);
    }

    /**
     * Adds a quiz button definition to the page definition
     * @param {Object} content The current page definition object
     * @param {String} text The text displayed on the quiz button
     */
    addQuizButton(content, text) {
        this.addTextKey(content, "#quiz-button", text);
    }

    /**
     * Adds the default quiz button, with text ("Quiz me on this") to the page definition
     * @param {Object} content The current page definition object
     */
    addDefaultQuizButton(content) {
        this.addQuizButton(content, "Quiz me on this");
    }

    /**
     * Adds the text content to the page definition
     * @param {Object} content The current page definition object
     * @param {String} lessonContent The text content for the page
     */
    addLessonContent(content, lessonContent) {
        this.addTextKey(content, ".lesson-copy", lessonContent);
    }

    /**
     * Adds the lesson-cite attribute to the page definition
     * @param {Object} content The current page definition object
     * @param {int} lessonNumber The number of the lesson
     */
    addLessonCite(content, lessonNumber) {
        this.addTextKey(content, ".lesson-cite", "LESSON " + lessonNumber);
    }

    /**
     * Adds the title attribute to the page definition
     * @param {Object} content The current page definition object
     * @param {*} title The title of the lesson
     */
    addLessonTitle(content, title) {
        this.addTextKey(content, ".lesson-title", title);
    }

    /**
     * Adds the subtitle content to the page definition
     * @param {Object} content The current page definition object
     * @param {*} subTitle The text for the subtitle
     */
    addLessonSubTitle(content, subTitle) {
        this.addTextKey(content, ".lesson-subtitle", subTitle);
    }

    /**
     * Adds the navbar content to the page definition
     * @param {Object} content The current page definition object
     * @param {String} lessonTitle Title of the lesson
     */
    addNavbarTitle(content, lessonTitle) {
        content["#navbar-title"] = {
            type: "element_text_equals",
            value: lessonTitle,
        };
    }

    makeTextPage(
        title,
        subTitle,
        lessonCite,
        graphic,
        lessonContent,
        lessonNumber
    ) {
        var content = this.getContentBase();
        this.addNavbarTitle(content, title);
        this.addLessonCite(content, lessonNumber);
        this.addPosterImage(content, graphic);
        this.addDefaultQuizButton(content);
        this.addLessonTitle(content, title);
        this.addLessonSubTitle(content, subTitle);

        return content;
    }

    /**
     * Returns the base object definition for page content.
     */
    getContentBase() {
        return {
            "#app_root": {},
        };
    }
}
