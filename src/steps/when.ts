import { When } from "@cucumber/cucumber";

import clickPageElement from "../support/action/clickPageElement";

When(/^I (click|doubleclick) "([^"]*)?" on page "([^"]*)?"$/, clickPageElement);
