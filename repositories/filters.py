from django_filters import rest_framework as filters

from .models import Commit


class CommitFilter(filters.FilterSet):
    class Meta:
        model = Commit
        fields = ('category', 'in_stock')
