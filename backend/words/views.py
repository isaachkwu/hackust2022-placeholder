from words.models import Word
from words.permissions import IsOwner
from words.serializers import WordSerializer
from rest_framework import generics, viewsets
from django.contrib.auth.models import User
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
# from words.filters import IsMasteredFilter


class WordViewSet(viewsets.ModelViewSet):
  """
  This viewset provides CRUD actions to the word owner.
  """
  serializer_class = WordSerializer
  permission_classes = [permissions.IsAuthenticated, IsOwner]
  filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
  search_fields = ['word', 'note', 'my_sentence']
  # filterset_fields = ['part_of_speech']
  # filterset_class = IsMasteredFilter

  ordering_fields = ['created', 'word', 'part_of_speech', 'isMastered']
  ordering = ['created', ]

  def get_queryset(self):
      return Word.objects.filter(owner=self.request.user)

  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)

# class UserViewSet(viewsets.ReadOnlyModelViewSet):
#   """
#   This viewset provides read-only actions.
#   """
#   queryset = User.objects.all()
#   serializer_class = UserSerializer

# Admin Viewset
# class AdminWordViewSet(viewsets.ModelViewSet):
#   """
#   This viewset provides words CRUD actions to the admin.
#   """
#   serializer = WordSerializer
#   permission_classes = [permissions.IsAdminUser]

#   def perform_create(self, serializer):
#     serializer.save(owner=self.request.user)

# class UserViewSet(viewsets.ModelViewSet):
#   """
#   This viewset provides users CRUD actions for admin.
#   """
#   queryset = User.objects.all()
#   permission_classes = [permissions.IsAdminUser]
#   serializer_class = UserSerializer