import type { Selector } from "webdriverio";

/**
 * cucumber-boilerplate wrapper for waitFor
 *
 * Created by cucumber-boilerplate
 * Updated 06/21/22 by: kjh, JIRA Issue: not tracked,
 *             Changed: make compatible with existing 2MH cucumber steps
 *
 * Copyright 2022 2Morrow, Inc. All rights reserved
 */

type WaitForCommands =
    | "waitForClickable"
    | "waitForDisplayed"
    | "waitForEnabled"
    | "waitForExist";

/**
 * Wait for the given element to be enabled, displayed, or to exist
 * @param  {Selector | string}   selector               Element selector
 * @param  {string}   ms                       Wait duration (including 'ms' is optional)
 * @param  {boolean | string}   reverseAssertion     Check for opposite state.
 *                                               true | anyString checks actual
 *                                               false | "not" checks reverse
 * @param  {string}   state                    State to check for (default is
 *                                             existence)
 */
export default async (
    selector: Selector | string,
    ms: string,
    reverseAssertion: boolean | string,
    state: string
) => {
    const bVerbose: boolean = true;
    if (bVerbose)
        console.log(
            "wF - waitFor called with params\n  selector: >%s<\n  ms: >%s<\n  reverseAssertion: >%s<\n  state: >%s<",
            selector,
            ms,
            reverseAssertion,
            state
        );

    /**
     * Maximum number of milliseconds to wait, default 3000
     * @type {number}
     */
    ms = ms.toString().replace(/ms/g, "");
    const intMs: number = parseInt(ms, 10) || 3000;

    /**
     * Command to perform on the browser object
     * @type {WaitForCommands}
     */
    let command: WaitForCommands = "waitForExist";
    if (state === "be visible") {
        state = "be displayed";
    }
    if (bVerbose) console.log("  wF - initially set command to >%s<", command);

    /**
     * Parsed interpretation of the state
     * @type {String}
     */
    let parsedState: string = "";

    if (state) {
        parsedState =
            state.indexOf(" ") > -1
                ? state.split(/\s/)[state.split(/\s/).length - 1]
                : state;

        if (parsedState) {
            command = (`waitFor${parsedState[0].toUpperCase()}` +
                `${parsedState.slice(1)}`) as WaitForCommands;
            if (bVerbose)
                console.log("    wF - reset command to >%s<", command);
        }

        // // clickable doesn't work for some reason
        // if (command === "waitForClickable") {
        //     console.log(
        //         "  wF - overrode waitForClickable because that crashes"
        //     );
        //     command = "waitForDisplayed";
        // }
    }

    /**
     * Boolean interpretation of the assertion reversal flag
     * @type {Boolean}
     */
    let boolReverseAssertion: boolean = !!reverseAssertion;
    if (typeof reverseAssertion === "string") {
        boolReverseAssertion = reverseAssertion.indexOf("not") !== -1;
    }

    if (bVerbose)
        console.log(
            "  wF - waiting >%s< for results from >%s< >%s< >%s<",
            intMs.toString() + " ms",
            selector,
            command,
            boolReverseAssertion
        );
    const eElemToWaitOn: any = await $(selector);
    await eElemToWaitOn[command]({
        timeout: intMs,
        reverse: boolReverseAssertion,
    });
};
