var gr = new GlideRecord('sys_email');
gr.addEncodedQuery('mailbox=outbox');
gr.query();
gr.next();
gr.deleteMultiple();
gs.setProperty('glide.email.smtp.active', 'true');
gs.eventQueue('admin.notification', current, 'test', gs.getUserName());
gs.setProperty('glide.email.smtp.active', 'false');
