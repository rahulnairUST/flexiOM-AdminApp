sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, UIComponent, History, Fragment, Filter, FilterOperator, BaseController) {
        "use strict";

        return Controller.extend("com.prd.alloc.admin.mngprdallocadmin.controller.PlanningSettings", {

            onInit: function () {
                this._formFragments = {};
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.getRoute("RoutePlanningSettings").attachPatternMatched(this._onObjectMatched, this);
                this._createSettingsModel();
            },

            _onObjectMatched: function (oEvent) {
                var oPlanningScreen = oEvent.getParameter("arguments").planningScreen;
                this._oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                var oPageID = this._oResourceBundle.getText("planningScreenSettings");
                var oTitle = oPageID + "-" + oPlanningScreen;
                this._showFormFragment("DisplayPlanningScreenSettings");
                var oModel = this.getOwnerComponent().getModel();
                var sPath = "/FLEXIOM";
                var ofilter = new Filter({
                    path: 'PlanningScreen',
                    operator: FilterOperator.EQ,
                    value1: oPlanningScreen
                });
                var aFilters = [];
                aFilters.push(ofilter);
                this._populatePlanningSettingsData(oModel, sPath, aFilters, oPlanningScreen);
                this.getView().byId("iddetailPage").setTitle(oTitle);
            },

            _populatePlanningSettingsData: function(oModel, sPath, aFilters, key) {
                var oView = this.getView();
                if (aFilters) {
                    oModel.read(sPath, {
                        filters: aFilters,
                        success: function (oData, response) {
                            var oJSONModel = new JSONModel();
                            oJSONModel.setData(oData.results[0]);
                            oView.setModel(oJSONModel, "planningSettings");
                        }, error: function () {
                            
                        }
                    });       
                } else {
                    
                }
            },

            _createSettingsModel: function () {
                var oSettingsJSON = {
                    "results": [{
                        "key": "1",
                        "text": "Planning Screen Settings",
                        "nodes": [{
                            "key": "1-1",
                            "text": "Column Settings"
                        }, {
                            "key": "1-2",
                            "text": "Row Settings"
                        }, {
                            "key": "1-3",
                            "text": "Calculation Settings"
                        }, {
                            "key": "1-4",
                            "text": "Constraints"
                        }, {
                            "key": "1-5",
                            "text": "Order Screen Settings"
                        }]
                    }, {
                        "key": "2",
                        "text": "Selection IDs",
                        "node": [{
                            "key": "2-1",
                            "text": "aATP Allocation"
                        }, {
                            "key": "2-2",
                            "text": "Sales Order and DN, CVC Based"
                        }, {
                            "key": "2-3",
                            "text": "ATP Overview"
                        }, {
                            "key": "2-4",
                            "text": "ATP Timeseries"
                        }]
                    }, {
                        "key": "3",
                        "text": "Selection ID Grouping"
                    }, {
                        "key": "4",
                        "text": "Order Management Settings"
                    }]
                };
                var oModel = new JSONModel();
                oModel.setData(oSettingsJSON);
                this.getView().setModel(oModel, "settingsModel");
            },

            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RoutePlanningScreenList");
                }
            },

            _showFormFragment: function(sFragmentName) {
                var oPage = this.byId("iddetailPage");
                oPage.removeAllContent();
                this._getFormFragment(sFragmentName).then(function (oVBox) {
                    oPage.insertContent(oVBox);
                });
            },

            _getFormFragment: function(sFragmentName) {
                var pFormFragment = this._formFragments[sFragmentName],
                    oView = this.getView();

                if (!pFormFragment) {
                    pFormFragment = Fragment.load({
                        id: oView.getId(),
                        name: "com.prd.alloc.admin.mngprdallocadmin.fragments." + sFragmentName,
                        controller: this
                    });
                    this._formFragments[sFragmentName] = pFormFragment;
                }

                return pFormFragment;
            },

            onEditPlnScrSetPressed: function() {
                this._showFormFragment("ChangePlanningScreenSettings");    
            },

            onDisplayPlnScrSetPressed: function() {
                this._showFormFragment("DisplayPlanningScreenSettings");
            },

            onSavePlnScrSetPressed: function() {
                
            },

            onSelectSettings: function(oEvent) {
                var oSelectedSettings = oEvent.getParameters().listItem.getProperty("title");
                if (oSelectedSettings != null) {
                    switch(oSelectedSettings) {
                        case 'Planning Screen Settings':
                            this._showFormFragment("DisplayPlanningScreenSettings");
                            break;
                        case 'Column Settings': 
                            this._showFormFragment("DisplayColumnSettings");
                            this._populateColumnSettings();
                            break;
                        case 'Row Settings': 
                            this._showFormFragment("DisplayRowSettings");
                            this._populateRowSettings();
                            break;
                        case 'Calculation Settings': 
                            break;
                        case 'Constraints':
                            break;
                        case 'Order Screen Settings':
                            break;
                        case 'Selection IDs':
                            break;
                        case 'aATP Allocation':
                            break;
                        case 'Sales Order and DN, CVC Based':
                            break;
                        case 'ATP Overview':
                            break;
                        case 'ATP Timeseries':
                            break;
                        case 'Selection ID Grouping':
                            break;
                        case 'Order Management Settings':
                            break;                                              
                    }
                }
            },

            onEditColSetPressed: function() {
                this._showFormFragment("ChangeColumnSettings");    
            },

            onDisplayColSetsPressed: function() {
                this._showFormFragment("DisplayColumnSettings");
            },

            _populateColumnSettings: function() {
                // var oModel = this.getOwnerComponent().getModel();
                // oModel.read("/FLEXIOMROW", {
                //     success: function(oData, response) {
                //         var oRowModel 
                //     }, error: function(err) {

                //     }
                // });
            },

            _populateRowSettings: function() {
                var oView = this.getView();
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/FLEXIOMROW", {
                    success: function(oData, response) {
                        var oRowModel = new JSONModel();
                        oRowModel.setData(oData);
                        oView.setModel(oRowModel, "rowData");    
                    }, error: function(err) {

                    }
                });
            },

            onEditRowSetPressed: function() {
                this._showFormFragment("ChangeRowSettings");   
            },

            onDisplayRowSetsPressed: function() {
                this._showFormFragment("DisplayRowSettings");
            }

        });
    });