#
# Baruwa - Web 2.0 MailScanner front-end.
# Copyright (C) 2010-2012  Andrew Colin Kissa <andrew@topdog.za.net>
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along
# with this program; if not, write to the Free Software Foundation, Inc.,
# 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
#
# vim: ai ts=4 sts=4 et sw=4
#

from django.db import models
from django.contrib.auth.models import User

class WebSavedFilter(models.Model):
    """SavedFilter"""
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    field = models.CharField(max_length=25)
    op_field = models.IntegerField()
    value = models.CharField(max_length=100)
    user = models.ForeignKey(User)

    class Meta:
        # app_label = 'web'
        db_table = 'web_report_filters'

    def __unicode__(self):
        return u"Web Saved Filter id: " + self.id