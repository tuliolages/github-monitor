from django.conf import settings

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'page_size': settings.REST_FRAMEWORK['PAGE_SIZE'],
            'results': data
        })