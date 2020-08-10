// Added line 40-55 to assist related list filtering for Added CI.

var AssociateCIToTask = Class.create();
AssociateCIToTask.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  SESSION_KEY: 'com.snc.change_request.AssociateCIToTask.ci_user_filter',

  ajaxFunction_getURL: function () {
    var chgReqId = this.getParameter('sysparm_id');
    var addToTable = this.getParameter('sysparm_add_to') + '';
    return this._getURL(chgReqId, addToTable);
  },

  _getURL: function (chgReqId, addToTable) {
    this.removeUserFilter();

    var latestClassAdded;
    var parentClass = '';

    // latestClassAdded logic
    // 1. if there are ci's, get the latest class of the ci
    // 2. default the latest class to parent class
    if (addToTable === 'task_ci') {
      latestClassAdded = this.getLatestClass(chgReqId);
      parentClass = this.getParentClass(chgReqId);
      if (!latestClassAdded) latestClassAdded = parentClass;
    } else latestClassAdded = 'cmdb_ci';

    var url = new GlideURL('task_add_affected_cis.do');
    url.set('sysparm_crSysId', chgReqId);
    url.set('sysparm_view', 'associate_ci');
    url.set('sysparm_add_to', addToTable);
    url.set('sysparm_stack', 'no');
    url.set('sysparm_table', latestClassAdded);
    url.set('sysparm_parent_class', parentClass);

    // ********************** Added **********************
    // Changes the related list filter for Affected CI to show based on company
    // Need to review later to possibl streamline.
    var gr_chg = new GlideRecord('change_request');
    if (gr_chg.get(chgReqId)) {
      url.set('sysparm_query', 'install_status!=7^company=' + gr_chg.company);
    }
    var gr_pm = new GlideRecord('problem');
    if (gr_pm.get(chgReqId)) {
      url.set('sysparm_query', 'install_status!=7^company=' + gr_pm.company);
    }
    var gr_inc = new GlideRecord('incident');
    if (gr_inc.get(chgReqId)) {
      url.set('sysparm_query', 'install_status!=7^company=' + gr_inc.company);
    }
    // ********************** End of Add **********************

    return url;
  },

  /*
   * If "Best Practice - Bulk CI Changes" plugin is active and task type is change_requests
   *     parent class = ci_class populated on the change_request
   *     if --None- is selected for ci_class, then cmdb_ci is returned
   * else
   *     parent class = cmdb_ci
   **/
  getParentClass: function (chgReqId) {
    if (GlidePluginManager.isActive('com.snc.bestpractice.bulkchange')) {
      var chgReqGR = new GlideRecordSecure('change_request');
      if (chgReqGR.get(chgReqId) && chgReqGR.ci_class) return chgReqGR.ci_class;
    }
    return 'cmdb_ci';
  },

  storeUserFilter: function () {
    var filter;
    filter = this.getParameter('sysparm_filter_query');
    gs.getSession().putClientData(this.SESSION_KEY, filter);
    return;
  },

  removeUserFilter: function () {
    gs.getSession().clearClientData(this.SESSION_KEY);
    return;
  },

  addSelected: function () {
    var id = this.getParameter('sysparm_id');
    var addToTable = this.getParameter('sysparm_add_to_table') + '';
    var selCIsList = this.getParameter('sysparm_selCIs');

    var selCIs = selCIsList.split(',');
    for (var i = 0; i < selCIs.length; i++) {
      if (selCIs[i]) {
        var existingCI = new GlideRecordSecure(addToTable);
        if ('task_ci' === addToTable) {
          existingCI.addQuery('JOINtask.sys_id=task_ci.task');
          existingCI.addQuery('ci_item', selCIs[i]);
        } else {
          existingCI.addQuery('JOINtask.sys_id=task_cmdb_ci_service.task');
          existingCI.addQuery('cmdb_ci_service', selCIs[i]);
        }
        existingCI.addQuery('task', id);
        existingCI.query();

        if (!existingCI.hasNext()) {
          var affectedCI = new GlideRecordSecure(addToTable);
          affectedCI.initialize();
          affectedCI.task = id;
          if ('task_ci' === addToTable) affectedCI.ci_item = selCIs[i];
          else affectedCI.cmdb_ci_service = selCIs[i];
          affectedCI.insert();
        }
      }
    }
    return gs.getMessage(
      'Added selected configuration items successfully to the change request.'
    );
  },

  getLatestClass: function (chgReqId) {
    var affectedCiGR = new GlideRecordSecure('task_ci');
    affectedCiGR.addQuery('JOINtask.sys_id=task_ci.task');
    affectedCiGR.addQuery('task', chgReqId);
    affectedCiGR.orderByDesc('sys_updated_on');
    affectedCiGR.setLimit(1);
    affectedCiGR.query();
    if (affectedCiGR.next()) return affectedCiGR.ci_item.sys_class_name;
    return '';
  },

  addAll: function () {
    var id = this.getParameter('sysparm_id');
    var query = this.getParameter('sysparm_query');
    var addToTable = this.getParameter('sysparm_add_to_table') + '';
    var listTableName = this.getParameter('sysparm_tableName');

    var result = [];
    var existingCI = new GlideRecordSecure(addToTable);
    if ('task_ci' === addToTable)
      existingCI.addQuery('JOINtask.sys_id=task_ci.task');
    else existingCI.addQuery('JOINtask.sys_id=task_cmdb_ci_service.task');
    existingCI.addQuery('task', id);
    existingCI.query();
    while (existingCI.next()) {
      if ('task_ci' === addToTable) result.push(existingCI.ci_item.sys_id);
      else result.push(existingCI.cmdb_ci_service.sys_id);
    }

    var affectedCiGR = new GlideRecordSecure(listTableName);
    affectedCiGR.addEncodedQuery(query);
    affectedCiGR.addQuery('sys_id', 'NOT IN', result.join());
    affectedCiGR.query();
    while (affectedCiGR.next()) {
      var affectedCI = new GlideRecordSecure(addToTable);
      affectedCI.initialize();
      affectedCI.task = id;
      if ('task_ci' === addToTable) affectedCI.ci_item = affectedCiGR.sys_id;
      else affectedCI.cmdb_ci_service = affectedCiGR.sys_id;
      affectedCI.insert();
    }
    return gs.getMessage(
      'Added {0} configuration items successfully to the change request.',
      affectedCiGR.getRowCount()
    );
  },

  getTotalNumberOfItems: function () {
    var query = this.getParameter('sysparm_query');
    var listTableName = this.getParameter('sysparm_table');
    var affectedCiGR = new GlideAggregate(listTableName);

    if (!affectedCiGR.canRead()) return 0;

    affectedCiGR.addEncodedQuery(query);
    affectedCiGR.addAggregate('COUNT');
    affectedCiGR.query();
    if (affectedCiGR.next()) return affectedCiGR.getAggregate('COUNT') - 0;
    return 0;
  },

  isPublic: function () {
    return false;
  },

  type: 'AssociateCIToTask',
});
