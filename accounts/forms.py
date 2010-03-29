#
# Baruwa
# Copyright (C) 2010  Andrew Colin Kissa
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
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
#
# vim: ai ts=4 sts=4 et sw=4
from django import forms
from django.forms.util import ErrorList
from django.forms import ModelForm
from baruwa.accounts.models import ACTIVE_CHOICES,TYPE_CHOICES,Users,UserFilters

YES_NO = (
    (0,'YES'),
    (1,'NO'),
)

class UserForm(ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    quarantine_report = forms.BooleanField(required=False)
    noscan = forms.ChoiceField(choices=YES_NO)
    class Meta:
        model = Users

class StrippedUserForm(ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    quarantine_report = forms.BooleanField(required=False)
    noscan = forms.ChoiceField(choices=YES_NO)
    class Meta:
        model = Users
        exclude = ('type','username')

class UserFilterForm(ModelForm):
    class Meta:
        model = UserFilters
