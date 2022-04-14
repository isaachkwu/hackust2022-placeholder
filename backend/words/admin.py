from django.contrib import admin
from words.models import Word
from django.contrib.auth.models import Group

# Register your models here.
# admin.site.register(Word)
@admin.register(Word)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('word', 'part_of_speech', 'owner')

admin.site.unregister(Group)