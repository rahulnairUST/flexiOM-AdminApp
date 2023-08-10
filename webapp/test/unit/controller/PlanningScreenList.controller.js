/*global QUnit*/

sap.ui.define([
	"comprdallocadmin/mngprdallocadmin/controller/PlanningScreenList.controller"
], function (Controller) {
	"use strict";

	QUnit.module("PlanningScreenList Controller");

	QUnit.test("I should test the PlanningScreenList controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
