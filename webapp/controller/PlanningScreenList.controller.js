sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, UIComponent, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.prd.alloc.admin.mngprdallocadmin.controller.PlanningScreenList", {
            onInit: function () {
                var oView = this.getView();
                this._populatePlanningList();
                this._initMultiInput();
            },

            _initMultiInput: function () {
                var oMultiInput = this.getView().byId("idPlanningScreenListMultiInput");
                var fnValidator = function (oArgs) {
                    var oObject = oArgs.suggestionObject.getBindingContext().getObject();
                    var key = oObject.PlanningScreen;
                    var text = oObject.PlanningScreenDescr;
                    return new sap.m.Token({ key: key, text: text });
                };
                oMultiInput.addValidator(fnValidator);
            },

            _populatePlanningList: function (aFilters) {
                var oView = this.getView();
                var oModel = this.getOwnerComponent().getModel();
                oModel.read('/FLEXIOM', {
                    filters: aFilters,
                    success: function (oData, response) {
                        var oModel = new JSONModel();
                        oModel.setData(oData);
                        oView.setModel(oModel, "planningData");
                    }, error: function (err) {

                    }
                });
            },

            onAfterRendering: function () {
                this._resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            },

            onValueHelpPlanningScreen: function () {
                var that = this;
                var oView = this.getView();
                var oInput = oView.byId("idPlanningScreenListMultiInput");
                this._oBasicSearchField = new sap.m.SearchField();
                if (!this._oValueHelpDialog) {
                    this._oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog("idValueHelp", {
                        key: "PlanningScreen",
                        descriptionKey: "PlanningScreenDescr",
                        ok: function (oEvent) {
                            var aTokens = oEvent.getParameter("tokens");
                            oInput.setTokens(aTokens);
                            this.close();
                        },
                        cancel: function () {
                            this.close();
                        }
                    });
                }
                var oDialog = this._oValueHelpDialog;
                oDialog.setTitle(this._resourceBundle.getText("planningScreenText"));
                //Bind the columns for table
                var oColModel = new sap.ui.model.json.JSONModel();
                oColModel.setData({
                    cols: [
                        { label: "Planning Screen", template: "PlanningScreen" },
                        { label: "Description", template: "PlanningScreenDescr" }
                    ]
                });

                var oTable = oDialog.getTable();
                oTable.setModel(oColModel, "columns");

                //creating row model and binding it to row aggregation of table
                var oModel = this.getOwnerComponent().getModel();
                oModel.read('/FLEXIOM', {
                    success: function (oData, response) {
                        var oRowModel = new JSONModel();
                        oRowModel.setData(oData);
                        oTable.setModel(oRowModel);
                        oTable.bindRows("/results");
                        oDialog.setTokens([]);
                        oDialog.setTokens(oInput.getTokens());
                        oDialog.update();
                        oDialog.open();
                    }, error: function (err) {

                    }
                });

            },

            onPlanningScreenItemPress: function (oEvent) {
                var oSelectedPlanningScreen = oEvent.getSource().getBindingContext("planningData").getProperty("PlanningScreen");
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("RoutePlanningSettings", {
                    "planningScreen": oSelectedPlanningScreen
                });
            },

            onSearch: function (oEvent) {
                var oView = this.getView();
                var aFilters = [], ofilter;
                var aTokens = oView.byId("idPlanningScreenListMultiInput").getTokens();
                for (var i = 0; i < aTokens.length; i++) {
                    ofilter = new Filter({
                        path: 'PlanningScreen',
                        operator: FilterOperator.EQ,
                        value1: aTokens[0].getProperty("key")
                    });
                    aFilters.push(ofilter);
                }
                this._populatePlanningList(aFilters);
            }
        });
    });
