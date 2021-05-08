/**
 * Main Use: call this within ref qualifier for catalog item to filter the results of Agency selection
 * Reference qualifier: javascript:new NCDIT_AssetUtils().getDivisionFromAgency(current.variables.ref_agency)
 *
 */

var NCDIT_AssetUtils = Class.create();
NCDIT_AssetUtils.prototype = {
  initialize: function () {},

  // Gather Assets assigned to or managed by the requested for User for possible replace
  // Called from variable set = "Asset-Replacement"  variable = "ref_asset_being_replaced"
  getUserAssets: function (requester) {
    var myString = 'assigned_to=' + requester + ' ^OR managed_by=' + requester;
    return myString;
  },

  // Lookup Agency assigned to reassign asset, use to trim reassign User list
  // Called from variable set = "Asset-Replacement"  variable = "ref_replace_reassign_to"
  lookupReassignUserList: function (asset) {
    var myString = 'active=true';
    var gr_asset = new GlideRecord('alm_hardware');
    gr_asset.get(asset);
    if (gr_asset.u_agency.toString() == '') {
      // If returning asset has no Agency set then leave myString  to return Active User list
      // 			gs.log("1=*" + myString + "*")
      return myString;
    }
    myString = myString + '^u_agency=' + gr_asset.u_agency;
    // If returning asset has Agency set, add Agency to Active user list
    // 		gs.log("2=*" + myString + "*")
    return myString;
  },

  // Display Assets In Stock/Available from selected Stockroom
  // Called from variable set = "Asset-SelectNew"  variable = "ref_source_asset"
  getAssetsFromStockroom: function (assetType) {
    var myString = '';
    if (current.variables.ref_source_stockroom.toString() == '') {
      // If Stockroom not selected, set myString to something that will never match, returning zero results
      myString = 'u_asset_configuration=I am IRON MAN!';
      return myString;
    }
    // Set myString looking for "In stock/Available from Stockroom selected", without Asset Configuration, for re-using Agency Hardware
    myString = 'install_status=6^substatus=available^stockroom=' + current.variables.ref_source_stockroom;
    // Add Asset Configuration to MyString, if selected
    if (assetType.toString() != '') myString = myString + '^u_asset_configuration=' + assetType;
    return myString;
  },

  // Display Divisions based upon selected Agency
  // Called from variable set = "Asset-BillingInfo"  variable = "ref_division"
  getDivisionFromAgency: function (agency) {
    var division = 'u_agency=' + agency;
    return division;
  },
  // Display Sections based upon selected Agency/Division
  // Called from variable set = "Asset-BillingInfo"  variable = "ref_section"
  getSectionFromDivision: function (division) {
    var section = 'u_division=' + division;
    return section;
  },
  // Display Units based upon selected Agency/Division/Section
  // Called from variable set = "Asset-BillingInfo"  variable = "ref_unit"
  getUnitFromSection: function (section) {
    var unit = 'u_section=' + section;
    return unit;
  },

  // Set selected Asset to In Stock/Reserved/Reserved for requested User
  // Called from workflow = "NCDIT Consumer PC/Monitor Hardware Request"  workflow activity/run script = "Set new asset to Reserved"
  setReservedAssetState: function (asset, state, substate, reserved_for) {
    var gr_asset = new GlideRecord('alm_hardware');
    gr_asset.get(asset);
    gr_asset.install_status = state;
    gr_asset.substatus = substate;
    gr_asset.reserved_for = reserved_for;
    gr_asset.update();
  },

  // Set State of new Asset to In Use
  // Set Billing Agency/Division/Section/Unit, if Install Date is blank, timestamp it; else leave as is
  // Called from workflow = "NCDIT Consumer PC/Monitor Hardware Request"  workflow activity/run script = "Set new Asset to In Use"
  setInUseAssetState: function (asset, state, substate, assigned_to, managed_by, stockroom, agency, division, section, unit, billingcode) {
    var gr_asset = new GlideRecord('alm_hardware');
    gr_asset.get(asset);
    gr_asset.install_status = state;
    gr_asset.substatus = '';
    gr_asset.reserved_for = ''; //overrides business rule that sets assigned_to to reserved_for
    gr_asset.assigned_to = assigned_to;
    gr_asset.managed_by = managed_by;
    gr_asset.stockroom = stockroom;
    gr_asset.u_agency = agency;
    gr_asset.u_division = division;
    gr_asset.u_section = section;
    gr_asset.u_unit = unit;
    gr_asset.u_billing_code = billingcode;
    var installdate = gs.nowDateTime(); //get current timestamp
    if (gr_asset.install_date.nil()) gr_asset.install_date = installdate;
    gr_asset.update();
  },

  // Set new User when being Reassigned
  // Called from workflow = "NCDIT Consumer PC/Monitor Hardware Request"  workflow activity/run script = "Set return Asset Status"
  setReassignedUser: function (asset, assigned_to, managed_by) {
    var gr_asset = new GlideRecord('alm_hardware');
    gr_asset.get(asset);
    gr_asset.assigned_to = assigned_to;
    gr_asset.managed_by = managed_by;
    gr_asset.update();
  },

  // Set State of returned Asset according to selected variables
  // Called from workflow = "NCDIT Consumer PC/Monitor Hardware Request"  workflow activity/run script = "Set return Asset Status"
  setReturnedAssetState: function (asset, state, substate, assigned_to, managed_by, stockroom, billing_code) {
    var gr_asset = new GlideRecord('alm_hardware');
    gr_asset.get(asset);
    gr_asset.install_status = state;
    gr_asset.substatus = substate;
    gr_asset.assigned_to = assigned_to;
    gr_asset.managed_by = managed_by;
    gr_asset.stockroom = stockroom;
    gr_asset.u_billing_code = billing_code;
    gr_asset.update();
  },

  // Add selected Consumables to Asset record
  // Called from workflow = "NCDIT Consumer PC/Monitor Hardware Request"  workflow activity/run script = "Add consumables to new asset"
  getConsumables: function (consumable) {
    var gr_consumable = new GlideRecord('alm_consumable');
    gr_consumable.addQuery('sys_id', consumable);
    gr_consumable.query();
    if (gr_consumable.next()) {
      return gr_consumable.sys_id;
    }
  },

  CalculateAssetTotalCost: function (assetid) {
    var total_cost = 0;

    var gr_asset = new GlideRecord('alm_asset');
    gr_asset.get(assetid);
    var currencyCode = gr_asset.cost.getCurrencyCode();

    var gr_consumables = new GlideRecord('alm_consumable');
    gr_consumables.addQuery('install_status', 10);
    gr_consumables.addQuery('parent', assetid);
    gr_consumables.query();
    while (gr_consumables.next()) {
      total_cost += parseFloat(gr_consumables.cost.getValue());
    }

    total_cost += parseFloat(gr_asset.cost);
    gr_asset.u_total_cost = currencyCode + ';' + total_cost;
    gr_asset.update();
  },

  type: 'NCDIT_AssetUtils',
};
