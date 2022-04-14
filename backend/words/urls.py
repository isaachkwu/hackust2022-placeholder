# from posixpath import basename
# from django.urls import path, include
# from rest_framework.urlpatterns import format_suffix_patterns
# from rest_framework.routers import DefaultRouter
# from words import views
# from words.views import WordViewSet, UserViewSet
# from rest_framework import renderers

# router = DefaultRouter()
# router.register(r'words', views.WordViewSet, basename='words')
# router.register(r'users', views.UserViewSet, basename='users')

# # word_list = WordViewSet.as_view({
# #     'get': 'list',
# #     'post': 'create'
# # })
# # word_detail = WordViewSet.as_view({
# #     'get': 'retrieve',
# #     'put': 'update',
# #     'patch': 'partial_update',
# #     'delete': 'destroy'
# # })
# # user_list = UserViewSet.as_view({
# #     'get': 'list'
# # })
# # user_detail = UserViewSet.as_view({
# #     'get': 'retrieve'
# # })

# urlpatterns = [
#     path('', include(router.urls))
#     # path('', views.api_root),
#     # path('words/', word_list, name='word-list'),
#     # path('words/<int:pk>/', word_detail, name='word-detail'),
#     # path('users/', user_list, name='user-list'),
#     # path('users/<int:pk>/', user_detail, name='user-detail')
# ]

# # urlpatterns = format_suffix_patterns(urlpatterns)

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from words import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'word', views.WordViewSet,basename="word")
# router.register(r'user', views.UserViewSet,basename="user")

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]

# urlpatterns += [
#     path('api-auth/', include('rest_framework.urls')),
# ]