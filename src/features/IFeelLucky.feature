###
# Checks ability to choose I feel lucky on google.com

#
# Copyright 2022 2Morrow, Inc. All Rights Reserved
###

Feature: IFeelLucky.feature
  As a developer I want to be able to click an element whose
  selector comes from a page definition file

Background: I can open the baseURL
  Given I open the site "/"

Scenario: Can click I Feel Lucky
  When I click "feelingLucky" on page "Google"