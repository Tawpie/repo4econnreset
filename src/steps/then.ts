import { Then } from "@cucumber/cucumber";

import checkTitle from "../support/check/checkTitle";

Then(/^I expect that the title is( not)* "([^"]*)?"$/, checkTitle);
