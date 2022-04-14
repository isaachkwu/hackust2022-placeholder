from django_filters import FilterSet
from words.models import Word

class IsMasteredFilter(FilterSet):
  class Meta:
    model = Word
    fields = ['isMastered']