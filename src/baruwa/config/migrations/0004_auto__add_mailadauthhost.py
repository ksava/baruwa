# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Adding model 'MailADAuthHost'
        db.create_table('auth_domain', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('ad_host', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['config.MailAuthHost'])),
            ('ad_search_dn', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('ad_admin_group', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('ad_user_group', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('ad_search_fields', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('ad_ldap_scheme', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('ad_auth_domain', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('ad_log_file', self.gf('django.db.models.fields.CharField')(max_length=255)),
        ))
        db.send_create_signal('config', ['MailADAuthHost'])


    def backwards(self, orm):
        
        # Deleting model 'MailADAuthHost'
        db.delete_table('auth_domain')


    models = {
        'accounts.useraddresses': {
            'Meta': {'object_name': 'UserAddresses', 'db_table': "'user_addresses'"},
            'address': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '255'}),
            'address_type': ('django.db.models.fields.IntegerField', [], {'default': '2'}),
            'enabled': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'load_balance': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        },
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '255'})
        },
        'config.configsection': {
            'Meta': {'object_name': 'ConfigSection', 'db_table': "'scanner_config_sections'"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        },
        'config.domainsignature': {
            'Meta': {'unique_together': "(('useraddress', 'signature_type'),)", 'object_name': 'DomainSignature', 'db_table': "'domain_signatures'"},
            'enabled': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'image': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'ds_si'", 'null': 'True', 'to': "orm['fixups.SignatureImg']"}),
            'signature_content': ('django.db.models.fields.TextField', [], {}),
            'signature_type': ('django.db.models.fields.IntegerField', [], {}),
            'useraddress': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'ds_ua'", 'to': "orm['accounts.UserAddresses']"})
        },
        'config.mailadauthhost': {
            'Meta': {'object_name': 'MailADAuthHost', 'db_table': "'auth_domain'"},
            'ad_admin_group': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'ad_auth_domain': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'ad_host': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['config.MailAuthHost']"}),
            'ad_ldap_scheme': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'ad_log_file': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'ad_search_dn': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'ad_search_fields': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'ad_user_group': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'config.mailauthhost': {
            'Meta': {'object_name': 'MailAuthHost', 'db_table': "'auth_hosts'"},
            'address': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'enabled': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'port': ('django.db.models.fields.IntegerField', [], {'blank': 'True'}),
            'protocol': ('django.db.models.fields.IntegerField', [], {'default': '1'}),
            'split_address': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'useraddress': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'mah_ua'", 'to': "orm['accounts.UserAddresses']"})
        },
        'config.mailhost': {
            'Meta': {'object_name': 'MailHost', 'db_table': "'mail_hosts'"},
            'address': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'enabled': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'port': ('django.db.models.fields.IntegerField', [], {'default': '25'}),
            'useraddress': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'mh_ua'", 'to': "orm['accounts.UserAddresses']"})
        },
        'config.scannerconfig': {
            'Meta': {'unique_together': "(('internal', 'host'),)", 'object_name': 'ScannerConfig', 'db_table': "'scanner_config'"},
            'display': ('django.db.models.fields.TextField', [], {}),
            'external': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'help': ('django.db.models.fields.TextField', [], {}),
            'host': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['config.ScannerHost']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'internal': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['config.ConfigSection']"}),
            'value': ('django.db.models.fields.TextField', [], {})
        },
        'config.scannerhost': {
            'Meta': {'object_name': 'ScannerHost', 'db_table': "'scanners'"},
            'address': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'fixups.signatureimg': {
            'Meta': {'unique_together': "(('name', 'owner'),)", 'object_name': 'SignatureImg', 'db_table': "'signature_imgs'"},
            'content_type': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'image': ('django.db.models.fields.TextField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'owner': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        }
    }

    complete_apps = ['config']
