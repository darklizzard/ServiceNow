/**
 * Name: Approval Request - DWS User Acceptance
 * Table: Approval [sysapproval_approver]
 * Category: Approval
 * Type: EMAIL
 * Active: True
 * When to Send:
 * Send when: Event is fired
 * Event Name: approval.inserted
 * Advanced condition:
 * DWS User Acceptance Approval notifications, This is based on the
 * if the workflow activity level = DWS user device acceptance, fire
 */

// you will need the below condition in the default approval but reverse the condition.
answer = current.wf_activity.getDisplayValue() == 'DWS user device acceptance' ? true : false;

/**
 * Who will receive:
 * Users/Groups in fields: Approver
 *
 * What will it contain:
 * Content type: HTML and plain test
 * Push Messages: Approval Request
 * Subject: Re:${sysapproval} - Acknowledge Device Receipt Acceptance
 * Message HTML:
 * By clicking accept I hereby acknowledge receipt of the approved requested mobile equipment/device,
 * cables and adapters with serial numbers listed below and understand that if it is lost, stolen or
 * damaged I will be held responsible for cost reimbursement to the State.  Furthermore, I certify
 * that I understand and agree to adhere to the rules and procedures that pertain to this equipment.
 * ________________________________________________________________________________________________
 * ${mail_script:dws_approval_activity}
 * ________________________________________________________________________________________________
 * ${mailto:dws.mailto.approval}
 * ________________________________________________________________________________________________
 * ${mailto:dws.mailto.reject}
 */
