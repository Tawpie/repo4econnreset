import { Selector } from "webdriverio";
import pause from "./pause";
import clickElement from "./clickElement";

/**
 * Use the getter to grab the element to click or doubleclick
 * from the page object file and click it
 *
 * Created by Kim around 2/28/18.
 * Updated 06/27/22 by: kjh, JIRA Issue: not tracked,
 *             Changed: bring over to the ts side
 *
 * Copyright 2022 2Morrow, Inc. All rights reserved
 *
 * @param  {String}   sAction  The action to perform (click or doubleClick)
 * @param  {String}   sGetter  The getter
 * @param  {String}   sWhichPage  The page object file that defines the getter
 */
export default async (
  sAction: "click" | "doubleClick",
  sGetter: string,
  sWhichPage: string
) => {
  const bVerbose: boolean = false;
  if (bVerbose)
    console.log(
      "\ncPE - clickPageElement called with params\n  sAction: >%s<\n  sGetter: >%s<\n  sWhichPage: >%s<",
      sAction,
      sGetter,
      sWhichPage
    );

  /**
   * import the page object class pointed to by sWhichPage
   * and grab the selector using the getter
   */
  const sPathToModule: string = "../../pages/" + sWhichPage + ".page.js";
  const cPageObject = require(sPathToModule).default;
  const selectorToClick: Selector = cPageObject[sGetter];
  if (bVerbose)
    console.log(
      "cPE -   selectorToClick resolved to >%s< with typeOf >%s<",
      selectorToClick,
      typeof selectorToClick
    );

  /**
   * The method to call on the element
   * @type {String}
   */
  const action: "click" | "doubleClick" =
    sAction === "doubleClick" ? "doubleClick" : "click";

  // get the element and click it
  // const eElemToClick = await $(selectorToClick);
  // if (bVerbose)
  //   console.log(
  //     "cPE -   the selector successfully returned eElemToClick ",
  //     eElemToClick
  //   );

  // await eElemToClick.click();

  // make sure it's clickable then click it
  await clickElement(action, "selector", selectorToClick);
  await pause("300ms");
};
