sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, UIComponent, History, Fragment, Filter, FilterOperator, MessageBox) {
        "use strict";

        return Controller.extend("com.prd.alloc.admin.mngprdallocadmin.controller.PlanningSettings", {

            onInit: function () {
                this._formFragments = {};
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.getRoute("RoutePlanningSettings").attachPatternMatched(this._onObjectMatched, this);
                this._createSettingsModel();
                this._createDataSourceModel();
                this._createPlanningScreenSettingsModels();
            },

            _onObjectMatched: function (oEvent) {
                this._planningScreen = oEvent.getParameter("arguments").planning_screen;
                this._oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                var oPageID = this._oResourceBundle.getText("planningScreenSettings");
                var oTitle = oPageID + "-" + this._planningScreen;
                this._showFormFragment("DisplayPlanningScreenSettings");
                this._populatePlanningSettingsData();
                this.getView().byId("iddetailPage").setTitle(oTitle);
            },

            _populatePlanningSettingsData: function () {
                var oView = this.getView();
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var sPath = "/PlanningScreenStngs";
                var ofilter = new Filter({
                    path: 'planning_screen',
                    operator: FilterOperator.EQ,
                    value1: this._planningScreen
                });
                var aFilters = [];
                aFilters.push(ofilter);
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

            _createDataSourceModel: function () {
                var oDataSource = {
                    "results": [{
                        "key": 1,
                        "text": "aATP Product Allocation"
                    }, {
                        "key": 2,
                        "text": "Sales Orders and Deliverables - CVC Based"
                    }, {
                        "key": 3,
                        "text": "ATP Overview - Scope of Check Based"
                    }, {
                        "key": 4,
                        "text": "Timeseries Data - Stocks, Receipts, Issues"
                    }, {
                        "key": 5,
                        "text": "SAP SCM Planning Area"
                    }]
                };

                var oModel = new JSONModel();
                oModel.setData(oDataSource);
                this.getView().setModel(oModel, "dataSource");
            },

            _createPlanningScreenSettingsModels: function () {
                var selectOptns1 = {
                    "results": [{
                        "key": "A",
                        "text": "Display date per user settings (for daily buckets)"
                    }, {
                        "key": "B",
                        "text": "Display start date of bucket (per user settings)"
                    }, {
                        "key": "C",
                        "text": "Display end date of bucket (per user settings)"
                    }, {
                        "key": "D",
                        "text": "Display PPYYYY (for week, month, quarter, FY)"
                    }, {
                        "key": "E",
                        "text": "Display PPPYYYY (for day, FY)"
                    }, {
                        "key": "F",
                        "text": "Display: PP-YYYY (for week, month, quarter, fiscal FY)"
                    }, {
                        "key": "G",
                        "text": "Display: PPP-YYYY (for day, FY)"
                    }, {
                        "key": "H",
                        "text": "Display: PP/YYYY (for week, month, quarter, fiscal FY)"
                    }, {
                        "key": "I",
                        "text": "Display: PPP/YYYY (for day, FY)"
                    }, {
                        "key": "J",
                        "text": "Display: YYYYPP (for week, month, quarter, fiscal FY)"
                    }, {
                        "key": "K",
                        "text": "Display: YYYYPPP (for day, FY)"
                    }, {
                        "key": "L",
                        "text": "Display: YYYY-PP (for week, month, quarter, fiscal FY)"
                    }, {
                        "key": "M",
                        "text": "Display: YYYY-PPP (for day, FY)"
                    }, {
                        "key": "N",
                        "text": "Display: YYYY/PP (for week, month, quarter, fiscal FY)"
                    }, {
                        "key": "O",
                        "text": "Display: YYYY/PPP (for day, FY)"
                    }]
                };

                var oModel = new JSONModel();
                oModel.setData(selectOptns1);
                this.getView().setModel(oModel, "selectOpt1");

                var selectOpt2 = {
                    "results": [{
                        "key": "A",
                        "text": "No Display"
                    }, {
                        "key": "B",
                        "text": "Show button in toolbar"
                    }, {
                        "key": "C",
                        "text": "Show as context menu (right mouse click)"
                    }, {
                        "key": "D",
                        "text": "Show as button in toolbar and context menu"
                    }]
                };

                var oModel2 = new JSONModel();
                oModel2.setData(selectOpt2);
                this.getView().setModel(oModel2, "selectOpt2");

                var selectOpt3 = {
                    "results": [{
                        "key": "A",
                        "text": "No activation status change, no constraint status change"
                    }, {
                        "key": "B",
                        "text": "Activation status change, no constraint status change"
                    }, {
                        "key": "C",
                        "text": "No activation status change, change constraint status"
                    }, {
                        "key": "D",
                        "text": "Change activation status, change constraint status"
                    }]
                };

                var oModel3 = new JSONModel();
                oModel3.setData(selectOpt3);
                this.getView().setModel(oModel3, "selectOpt3");
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

            _showFormFragment: function (sFragmentName) {
                var oPage = this.byId("iddetailPage");
                oPage.removeAllContent();
                this._getFormFragment(sFragmentName).then(function (oVBox) {
                    oPage.insertContent(oVBox);
                });
            },

            _getFormFragment: function (sFragmentName) {
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

            onEditPlnScrSetPressed: function () {
                this._showFormFragment("ChangePlanningScreenSettings");
                this._populatePlanningSettingsData();
            },

            onDisplayPlnScrSetPressed: function () {
                this._showFormFragment("DisplayPlanningScreenSettings");
                this._populatePlanningSettingsData();
            },

            onSavePlnScrSetPressed: function () {
                var oView = this.getView();
                var oPlanningScreenData = oView.getModel("planningSettings").getData();
                debugger;
            },

            onSelectSettings: function (oEvent) {
                var oSelectedSettings = oEvent.getParameters().listItem.getProperty("title");
                if (oSelectedSettings != null) {
                    switch (oSelectedSettings) {
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
                            this._showFormFragment("DisplaySelectionIDs");
                            this._populateSelectionIDs(this._planningScreen);
                            break;
                        case 'aATP Allocation':
                            break;
                        case 'Sales Order and DN, CVC Based':
                            break;
                        case 'ATP Overview':
                            break;
                        case 'ATP Timeseries':
                            this._showFormFragment("DisplayATPTimeseries");
                            break;
                        case 'Selection ID Grouping':
                            break;
                        case 'Order Management Settings':
                            break;
                    }
                }
            },

            onAddSelectionIDsPressed: function () {
                var oView = this.getView();
                var that = this;
                if (!this._sDialog) {
                    // load asynchronous XML fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: "com.prd.alloc.admin.mngprdallocadmin.fragments.AddSelectionID",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else {
                    this._sDialog.open();
                }
            },

            onSelectionIDCancel: function () {
                var oDialog = this.getView().byId("idAddSelectionIDDialog");
                oDialog.close();
                oDialog.destroy();
            },

            onEditColSetPressed: function () {
                var oView = this.getView();
                var that = this;
                var oTableData = oView.byId("idDispColSettingsTable").getModel("columnData").getData();
                var oSelectedIndex = oView.byId("idDispColSettingsTable").getSelectedIndex();
                if (oSelectedIndex >= 0) {
                    var oModel = new JSONModel();
                    oModel.setData(oTableData.results[oSelectedIndex]);
                    oView.setModel(oModel, "editColSettings");
                    if (!this._sDialog) {
                        // load asynchronous XML fragment
                        Fragment.load({
                            id: oView.getId(),
                            name: "com.prd.alloc.admin.mngprdallocadmin.fragments.ChangeColumnSettings",
                            controller: this
                        }).then(function (oDialog) {
                            oView.addDependent(oDialog);
                            that._colTypeSelectOptions();
                            that._materialDispSelectOptions();
                            that._custDispSelectOptions();
                            that._cvcDispSelectOptions();
                            oDialog.open();
                        });
                    } else {
                        this._sDialog.open();
                    }
                } else {
                    MessageBox.warning(this._oResourceBundle.getText("warningSelectRow"), {
                        title: this._oResourceBundle.getText("warning"),                                    // default
                        onClose: null,                                       // default
                        styleClass: "",                                      // default
                        actions: sap.m.MessageBox.Action.OK,                 // default
                        emphasizedAction: sap.m.MessageBox.Action.OK,        // default
                        initialFocus: null,                                  // default
                        textDirection: sap.ui.core.TextDirection.Inherit     // default
                    });
                }
            },

            _colTypeSelectOptions: function() {
                var colTypes = {
                    "results": [{
                        "key": "A",
                        "text": "Characteristic (Material)"
                    }, {
                        "key": "B",
                        "text": "Characteristic (Plant)"
                    }, {
                        "key": "C",
                        "text": "Characteristic (Customer)"
                    }, {
                        "key": "D",
                        "text": "Characteristic (Other)"
                    }, {
                        "key": "E",
                        "text": "Keyfigure"
                    }, {
                        "key": "F",
                        "text": "Bucket"
                    }]
                };

                var oModel = new JSONModel();
                oModel.setData(colTypes);
                this.getView().setModel(oModel, "colTypes");
            },

            _materialDispSelectOptions: function() {
                var materialDisp = {
                    "results": [{
                        "key": "A",
                        "text": "Not used"
                    }, {
                        "key": "B",
                        "text": "Show material number"
                    }, {
                        "key": "C",
                        "text": "Show material description"
                    }, {
                        "key": "D",
                        "text": "Show material number and description"
                    }, {
                        "key": "E",
                        "text": "Let user toggle between material number and/or description"
                    }]
                };

                var oModel = new JSONModel();
                oModel.setData(materialDisp);
                this.getView().setModel(oModel, "materialDisp");
            },

            _custDispSelectOptions: function() {
                var custDisp = {
                    "results": [{
                        "key": "A",
                        "text": "Not used"
                    }, {
                        "key": "B",
                        "text": "Show customer number"
                    }, {
                        "key": "C",
                        "text": "Show customer description"
                    }, {
                        "key": "D",
                        "text": "Show customer number and description"
                    }, {
                        "key": "E",
                        "text": "Let user toggle between customer number and description"
                    }]
                };

                var oModel = new JSONModel();
                oModel.setData(custDisp);
                this.getView().setModel(oModel, "custDisp");
            },

            _cvcDispSelectOptions: function() {
                var cvcDisp = {
                    "results": [{
                        "key": "A",
                        "text": "CVC value display as per row setting"
                    }, {
                        "key": "B",
                        "text": "Display CVC value"
                    }, {
                        "key": "C",
                        "text": "Fill CVC value, but hide entire column"
                    }]
                };

                var oModel = new JSONModel();
                oModel.setData(cvcDisp);
                this.getView().setModel(oModel, "cvcDisp");
            },

            onColSetEditCancel: function() {
                var oDialog = this.getView().byId("idEditColSettings");
                oDialog.close();
                oDialog.destroy();
            },

            onColSetEditConfirm: function() {
                var that = this;
                var oView = this.getView();
                var oColData = oView.getModel("editColSettings").getData();
                var oUpdateJSON = {
                    "planning_screen": oColData.planning_screen,
                    "column_name": oColData.column_name,
                    "characteristic": oColData.characteristic,
                    "description": oColData.description,
                    "ddic_ref": oColData.ddic_ref,
                    "column_type": oColData.column_type,
                    "material_display": oColData.material_display,
                    "customer_display": oColData.customer_display,
                    "sorting": oColData.sorting,
                    "collapsible": oColData.collapsible,
                    "column_fixed": oColData.column_fixed,
                    "cvc_display": oColData.cvc_display,
                    "cvc_color_code": oColData.cvc_color_code
                };

                var oModel = this.getOwnerComponent().getModel();
                oModel.update("/Columns(planning_screen='" + oColData.planning_screen + "',column_name='" + oColData.column_name + "')", oUpdateJSON, {
                    success: function (oData, response) {
                        var msg = "Planning Screen: " + oColData.planning_screen + "- Column: " + oColData.line_name + "updated Successfully";
                        sap.m.MessageToast.show(msg);
                        that.onColSetEditCancel();
                        that._populateColumnSettings();
                    }, error: function (err) {

                    }
                });
            },

            onDisplayColSetsPressed: function () {
                this._showFormFragment("DisplayColumnSettings");
            },

            _populateColumnSettings: function () {
                var oView = this.getView();
                var ofilter = new Filter({
                    path: 'planning_screen',
                    operator: FilterOperator.EQ,
                    value1: this._planningScreen
                });
                var aFilters = [];
                aFilters.push(ofilter);
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Columns", {
                    filters: aFilters,
                    success: function (oData, response) {
                        var oColumnModel = new JSONModel();
                        oColumnModel.setData(oData);
                        oView.setModel(oColumnModel, "columnData");
                    }, error: function (err) {

                    }
                });
            },

            _populateRowSettings: function () {
                var oView = this.getView();
                var ofilter = new Filter({
                    path: 'planning_screen',
                    operator: FilterOperator.EQ,
                    value1: this._planningScreen
                });
                var aFilters = [];
                aFilters.push(ofilter);
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Rows", {
                    filters: aFilters,
                    success: function (oData, response) {
                        var oRowModel = new JSONModel();
                        oRowModel.setData(oData);
                        oView.setModel(oRowModel, "rowData");
                    }, error: function (err) {

                    }
                });
            },

            onEditRowSetPressed: function () {
                var oView = this.getView();
                var that = this;
                var oTableData = oView.byId("idDispRowSettingsTable").getModel("rowData").getData();
                var oSelectedIndex = oView.byId("idDispRowSettingsTable").getSelectedIndex();
                if(oSelectedIndex >= 0) {
                    var oModel = new JSONModel();
                    oModel.setData(oTableData.results[oSelectedIndex]);
                    oView.setModel(oModel, "editRowSettings");
                    if (!this._sDialog) {
                        // load asynchronous XML fragment
                        Fragment.load({
                            id: oView.getId(),
                            name: "com.prd.alloc.admin.mngprdallocadmin.fragments.ChangeRowSettings",
                            controller: this
                        }).then(function (oDialog) {
                            oView.addDependent(oDialog);
                            that._createGroupLevels();
                            that._tsTableSelectOptions();
                            that._cvcDisplaySelectOptions();
                            oDialog.open();
                        });
                    } else {
                        this._sDialog.open();
                    }
                } else {
                    MessageBox.warning(this._oResourceBundle.getText("warningSelectRow"), {
                        title: this._oResourceBundle.getText("warning"),                                    // default
                        onClose: null,                                       // default
                        styleClass: "",                                      // default
                        actions: sap.m.MessageBox.Action.OK,                 // default
                        emphasizedAction: sap.m.MessageBox.Action.OK,        // default
                        initialFocus: null,                                  // default
                        textDirection: sap.ui.core.TextDirection.Inherit     // default
                    });
                }
            },

            _createGroupLevels: function() {
                var groupLevel = {
                    "results": [{
                        "key": "A",
                        "text": "Only one group level"
                    }, {
                        "key": "B",
                        "text": "Group Level 1"
                    }, {
                        "key": "C",
                        "text": "Group Level 2"
                    }, {
                        "key": "D",
                        "text": "Group Level 3"
                    }, {
                        "key": "E",
                        "text": "Group Level 4"
                    }, {
                        "key": "F",
                        "text": "Group Level 5"
                    }, {
                        "key": "F",
                        "text": "Group Level 6"
                    }, {
                        "key": "G",
                        "text": "Group Level 7"
                    }, {
                        "key": "H",
                        "text": "Group Level 8"
                    }, {
                        "key": "I",
                        "text": "Group Level 9"
                    }]
                };

                var oModel = new JSONModel();
                oModel.setData(groupLevel);
                this.getView().setModel(oModel, "groupLevel");
            },

            _tsTableSelectOptions: function() {
                var tsTable = {
                    "results": [{
                        "key": "A",
                        "text": "No TS, but used for display"
                    }, {
                        "key": "B",
                        "text": "TS used for display, kept for entire runtime"
                    }, {
                        "key": "C",
                        "text": "TS not used for display, initialized after load"
                    }, {
                        "key": "D",
                        "text": "TS not used for display, kept for entire runtime"
                    }, {
                        "key": "E",
                        "text": "TS used for display and populated in BAdI"
                    }]
                };

                var oModel = new JSONModel();
                oModel.setData(tsTable);
                this.getView().setModel(oModel, "tsTable");
            },

            _cvcDisplaySelectOptions: function() {
                var cvcDisplay = {
                    "results": [{
                        "key": "A",
                        "text": "No CVC Display"
                    }, {
                        "key": "B",
                        "text": "Display CVC in all columns"
                    }, {
                        "key": "C",
                        "text": "Display CVC if value changes"
                    }, {
                        "key": "D",
                        "text": "Display CVC is value changes, within same CVC group"
                    }, {
                        "key": "E",
                        "text": "Display CVC as per column setting"
                    }]
                };

                var oModel = new JSONModel();
                oModel.setData(cvcDisplay);
                this.getView().setModel(oModel, "cvcDisplay");
            },

            onDisplayRowSetsPressed: function () {
                this._showFormFragment("DisplayRowSettings");
            },

            onEditSelectionIDsPressed: function () {
                this._showFormFragment("ChangeSelectionIDs");
            },

            onDisplaySelectionIDsPressed: function () {
                this._showFormFragment("DisplaySelectionIDs");
            },

            onEditATPTimeseriesPressed: function () {
                this._showFormFragment("ChangeATPTimeseries");
            },

            onDisplayATPTimeseriesPressed: function () {
                this._showFormFragment("DisplayATPTimeseries");
            },

            _populateSelectionIDs: function (oPlanningScreen) {
                var oView = this.getView();
                // var ofilter = new Filter({
                //     path: 'planning_screen',
                //     operator: FilterOperator.EQ,
                //     value1: oPlanningScreen
                // });
                // var aFilters = [];
                // aFilters.push(ofilter);
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/SelectionIDS", {
                    success: function (oData, response) {
                        var oSelectionIDModel = new JSONModel();
                        oSelectionIDModel.setData(oData);
                        oView.setModel(oSelectionIDModel, "selData");
                    }, error: function (err) {

                    }
                });
            },

            onRowSetEditConfirm: function() {
                var that = this;
                var oView = this.getView();
                var oRowData = oView.getModel("editRowSettings").getData();
                var oUpdateJSON = {
                    "planning_screen": oRowData.planning_screen,
                    "line_name": oRowData.line_name,
                    "description": oRowData.description,
                    "sorting": oRowData.sorting,
                    "cvc_group_idx": oRowData.cvc_group_idx,
                    "editable": oRowData.editable,
                    "draft": oRowData.draft,
                    "allow_keyfg_selection": oRowData.allow_keyfg_selection,
                    "timeseries_table": oRowData.timeseries_table,
                    "read_selectionid": oRowData.read_selectionid,
                    "save_selectionid": oRowData.save_selectionid,
                    "line_name_save": oRowData.line_name_save,
                    "line_name_backup": oRowData.line_name_backup,
                    "save_cons_check": oRowData.save_cons_check,
                    "delta_update": oRowData.delta_update,
                    "calculation_id": oRowData.calculation_id,
                    "calculation_sequence": oRowData.calculation_sequence,
                    "cvc_format_1st_occurrance": oRowData.cvc_format_1st_occurrance,
                    "cvc_display": oRowData.cvc_display,
                    "cvc_color": oRowData.cvc_color,
                    "cvc_color_code": oRowData.cvc_color_code,
                    "keyfigure_color_code": oRowData.keyfigure_color_code,
                    "bucket_color_code": oRowData.bucket_color_code,
                    "cvc_status_display": oRowData.cvc_status_display,
                    "cvc_status_color_code": oRowData.cvc_status_color_code,
                    "add_remove_orders": oRowData.add_remove_orders,
                    "notes_text_id": oRowData.notes_text_id
                };

                var oModel = this.getOwnerComponent().getModel();
                oModel.update("/Rows(planning_screen='" + oRowData.planning_screen + "',line_name='" + oRowData.line_name + "')", oUpdateJSON, {
                    success: function(oData, response) {
                        var msg = "Planning Screen: " + oRowData.planning_screen + "- Row: " + oRowData.line_name + "updated Successfully";
                        sap.m.MessageToast.show(msg);
                        that.onRowSetEditCancel();
                        that._populateRowSettings();
                    }, error: function(err) {

                    }
                });
            }, 

            onRowSetEditCancel: function() {
                var oDialog = this.getView().byId("idEditRowSettings");
                oDialog.close();
                oDialog.destroy();
            },

            onCreateColSetPressed: function() {
                var oView = this.getView();
                var that = this;
                var columnData = {
                    "planning_screen": "",
                    "column_name": "",
                    "characteristic": "",
                    "description": "",
                    "ddic_ref": "",
                    "column_type": "",
                    "material_display": "",
                    "customer_display": "",
                    "sorting": "",
                    "collapsible": false,
                    "column_fixed": false,
                    "cvc_display": "",
                    "cvc_color_code": ""
                };
                var oModel = new JSONModel();
                oModel.setData(columnData);
                oView.setModel(oModel, "createColSettings");
                if (!this._sDialog) {
                    // load asynchronous XML fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: "com.prd.alloc.admin.mngprdallocadmin.fragments.CreateColumnSettings",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        that._colTypeSelectOptions();
                        that._materialDispSelectOptions();
                        that._custDispSelectOptions();
                        that._cvcDispSelectOptions();
                        oDialog.open();
                    });
                } else {
                    this._sDialog.open();
                }
                    
                },

            onColSetCreateCancel: function() {
                var oDialog = this.getView().byId("idCreateColSettings");
                oDialog.close();
                oDialog.destroy();
            },

            onColSetCreateConfirm: function() {
                var that = this;
                var oSelectedData = this.getView().getModel("createColSettings").getData();
                var oCreateJSON = {
                    "planning_screen": this._planningScreen,
                    "column_name": oSelectedData.column_name,
                    "characteristic": oSelectedData.characteristic,
                    "description": oSelectedData.description,
                    "ddic_ref": oSelectedData.ddic_ref,
                    "column_type": oSelectedData.column_type,
                    "material_display": oSelectedData.material_display,
                    "customer_display": oSelectedData.customer_display,
                    "sorting": oSelectedData.sorting,
                    "collapsible": oSelectedData.collapsible,
                    "column_fixed": oSelectedData.column_fixed,
                    "cvc_display": oSelectedData.cvc_display,
                    "cvc_color_code": oSelectedData.cvc_color_code
                };
                
                var oModel = this.getOwnerComponent().getModel();
                oModel.create("/Columns", oCreateJSON, {
                    success: function(oData, response) {
                        var msg = "Column: " + oData.column_name + " created successfully";
                        sap.m.MessageToast.show(msg);
                        that.onColSetCreateCancel();
                        that._populateColumnSettings();
                    }, error: function(err) {

                    }
                })
            },

            onDeleteColSetPressed: function() {
                var oView = this.getView();
                var that = this;
                var oTableData = oView.byId("idDispColSettingsTable").getModel("columnData").getData();
                var oSelectedIndex = oView.byId("idDispColSettingsTable").getSelectedIndex();
                if(oSelectedIndex >= 0) {
                    sap.m.MessageBox.information(this._oResourceBundle.getText("deleteMsg"), {
                        title: this._oResourceBundle.getText("info"),                                // default
                        onClose: function (oAction) {
                            if(oAction === "YES") {
                                var oModel = that.getOwnerComponent().getModel();
                                oModel.remove("/Columns(planning_screen='" + that._planningScreen + "',column_name='" + oTableData.results[oSelectedIndex].column_name + "')", {
                                    success: function(oData, response) {
                                        var msg = "Column deleted successfully";
                                        sap.m.MessageToast.show(msg);
                                        that._populateColumnSettings();
                                    }, error: function(err) {

                                    }
                                });
                            }
                        },                                       
                        styleClass: "",                                      
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],                 // default
                        emphasizedAction: sap.m.MessageBox.Action.YES,        
                        initialFocus: null,                                  
                        textDirection: sap.ui.core.TextDirection.Inherit     
                    });
                } else {
                    MessageBox.warning(this._oResourceBundle.getText("warningSelectRow"), {
                        title: this._oResourceBundle.getText("warning"),                                    // default
                        onClose: null,                                       // default
                        styleClass: "",                                      // default
                        actions: sap.m.MessageBox.Action.OK,                 // default
                        emphasizedAction: sap.m.MessageBox.Action.OK,        // default
                        initialFocus: null,                                  // default
                        textDirection: sap.ui.core.TextDirection.Inherit     // default
                    });
                }
            },

            onCreateRowSetPressed: function() {
                var oView = this.getView();
                var that = this;
                var oRowData = {
                    "planning_screen": "",
                    "line_name": "",
                    "description": "",
                    "sorting": "",
                    "cvc_group_idx": "",
                    "editable": false,
                    "draft": false,
                    "allow_keyfg_selection": false,
                    "timeseries_table": "",
                    "read_selectionid": "",
                    "save_selectionid": "",
                    "line_name_save": "",
                    "line_name_backup": "",
                    "save_cons_check": false,
                    "delta_update": false,
                    "calculation_id": "",
                    "calculation_sequence": "",
                    "cvc_format_1st_occurrance": "",
                    "cvc_display": "",
                    "cvc_color": "",
                    "cvc_color_code": "",
                    "keyfigure_color_code": "",
                    "bucket_color_code": "",
                    "cvc_status_display": "",
                    "cvc_status_color_code": "",
                    "add_remove_orders": "",
                    "notes_text_id": ""
                };
                var oModel = new JSONModel();
                oModel.setData(oRowData);
                oView.setModel(oModel, "createRowSettings");
                if (!this._sDialog) {
                    // load asynchronous XML fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: "com.prd.alloc.admin.mngprdallocadmin.fragments.CreateRowSettings",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        that._createGroupLevels();
                        that._tsTableSelectOptions();
                        that._cvcDisplaySelectOptions();
                        oDialog.open();
                    });
                } else {
                    this._sDialog.open();
                }                    
            },

            onRowSetCreateCancel: function() {
                var oDialog = this.getView().byId("idCreateRowSettings");
                oDialog.close();
                oDialog.destroy();
            },

            onRowSetCreateConfirm: function() {
                var that = this;
                var oView = this.getView();
                var oRowData = oView.getModel("createRowSettings").getData();
                var oCreateJSON = {
                    "planning_screen": this._planningScreen,
                    "line_name": oRowData.line_name,
                    "description": oRowData.description,
                    "sorting": oRowData.sorting,
                    "cvc_group_idx": oRowData.cvc_group_idx,
                    "editable": oRowData.editable,
                    "draft": oRowData.draft,
                    "allow_keyfg_selection": oRowData.allow_keyfg_selection,
                    "timeseries_table": oRowData.timeseries_table,
                    "read_selectionid": oRowData.read_selectionid,
                    "save_selectionid": oRowData.save_selectionid,
                    "line_name_save": oRowData.line_name_save,
                    "line_name_backup": oRowData.line_name_backup,
                    "save_cons_check": oRowData.save_cons_check,
                    "delta_update": oRowData.delta_update,
                    "calculation_id": oRowData.calculation_id,
                    "calculation_sequence": oRowData.calculation_sequence,
                    "cvc_format_1st_occurrance": oRowData.cvc_format_1st_occurrance,
                    "cvc_display": oRowData.cvc_display,
                    "cvc_color": oRowData.cvc_color,
                    "cvc_color_code": oRowData.cvc_color_code,
                    "keyfigure_color_code": oRowData.keyfigure_color_code,
                    "bucket_color_code": oRowData.bucket_color_code,
                    "cvc_status_display": oRowData.cvc_status_display,
                    "cvc_status_color_code": oRowData.cvc_status_color_code,
                    "add_remove_orders": oRowData.add_remove_orders,
                    "notes_text_id": oRowData.notes_text_id
                };

                var oModel = this.getOwnerComponent().getModel();
                oModel.create("/Rows", oCreateJSON, {
                    success: function (oData, response) {
                        var msg = "Row: " + oData.line_name + " created successfully";
                        sap.m.MessageToast.show(msg);
                        that.onRowSetCreateCancel();
                        that._populateRowSettings();
                    }, error: function (err) {

                    }
                });
            },

            onDeleteRowSetPressed: function() {
                var oView = this.getView();
                var that = this;
                var oTableData = oView.byId("idDispRowSettingsTable").getModel("rowData").getData();
                var oSelectedIndex = oView.byId("idDispRowSettingsTable").getSelectedIndex();
                if (oSelectedIndex >= 0) {
                    sap.m.MessageBox.information(this._oResourceBundle.getText("deleteMsg"), {
                        title: this._oResourceBundle.getText("info"),                                // default
                        onClose: function(oAction) {
                            if(oAction === "YES") {
                                var oModel = that.getOwnerComponent().getModel();
                                oModel.remove("/Rows(planning_screen='" + that._planningScreen + "',line_name='" + oTableData.results[oSelectedIndex].line_name + "')", {
                                    success: function (oData, response) {
                                        var msg = "Row deleted successfully";
                                        sap.m.MessageToast.show(msg);
                                        that._populateRowSettings();
                                    }, error: function (err) {

                                    }
                                });
                            }
                        },                                       
                        styleClass: "",                                      
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],                 
                        emphasizedAction: sap.m.MessageBox.Action.YES,        
                        initialFocus: null,                                  
                        textDirection: sap.ui.core.TextDirection.Inherit     
                    });
                } else {
                    MessageBox.warning(this._oResourceBundle.getText("warningSelectRow"), {
                        title: this._oResourceBundle.getText("warning"),                                    // default
                        onClose: null,                                       // default
                        styleClass: "",                                      // default
                        actions: sap.m.MessageBox.Action.OK,                 // default
                        emphasizedAction: sap.m.MessageBox.Action.OK,        // default
                        initialFocus: null,                                  // default
                        textDirection: sap.ui.core.TextDirection.Inherit     // default
                    });
                }
            }

        });
    });