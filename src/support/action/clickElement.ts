import { Selector } from "webdriverio";
import waitFor from "./waitFor";
import checkIfElementExists from "../lib/checkIfElementExists";
import pause from "./pause";

/**
 * Perform an click action on the given element
 *
 * Created by cucumber-boilerplate
 * Updated 06/27/22 by: kjh, JIRA Issue: not tracked,
 *             Changed: customize for 2MI
 *
 * Copyright 2022 2Morrow, Inc. All rights reserved
 *
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   selector Element selector
 */
export default async (
    action: "click" | "doubleClick",
    type: "link" | "selector",
    selector: Selector | string
) => {
    const bVerbose: boolean = true;
    if (bVerbose)
        console.log(
            "\ncE - clickElement called with params\n  action: >%s<\n  type: >%s<\n  selector: >%s<",
            action,
            type,
            selector
        );
    const bVeryVerbose: boolean = true;

    /**
     * Element to perform the action on
     * @type {string}
     */
    const selector2: Selector | string =
        type === "link" ? `=${selector}` : selector;
    if (bVerbose) console.log("cE -   modified selector to >%s<", selector2);

    /**
     * The method to call on the selected element
     * @type {string}
     */
    const method: "click" | "doubleClick" =
        action === "click" ? "click" : "doubleClick";

    // hang tight until the element is clickable
    if (bVerbose)
        console.log(
            "\ncE -   to-be-clicked element >%s< must be clickable",
            selector2
        );
    await waitFor(selector2, "3000", "", "clickable");

    if (bVerbose)
        console.log(
            "cE -   it is clickable, sending command >%s< to >%s<",
            method,
            selector2
        );

    // send the command
    const eElemToClick: any = await $(selector2);
    await eElemToClick[method]();
    if (bVerbose)
        console.log(
            "cE -     >%s< should have been sent successfully to element >%s",
            method,
            selector2
        );

    await pause("100ms");
};
